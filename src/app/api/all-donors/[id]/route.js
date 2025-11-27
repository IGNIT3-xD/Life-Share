import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        // console.log("Donor ID:", id);

        // Get current user
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.emailAddresses[0]?.emailAddress;
        if (!userEmail) {
            return NextResponse.json({ error: "User email not found" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db('LifeShare');

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        // First, find the donor to check ownership
        const donor = await db.collection('donor_list').findOne({
            _id: new ObjectId(id)
        });

        if (!donor) {
            return NextResponse.json({ error: "Donor not found" }, { status: 404 });
        }

        if (donor.email !== userEmail) {
            return NextResponse.json({
                error: "Forbidden: You can only delete your own donor profile"
            }, { status: 403 });
        }

        const result = await db.collection('donor_list').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Donor not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: 'Deleted successfully',
                deletedCount: result.deletedCount
            },
            { status: 200 }
        );
    }
    catch (err) {
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: err.message,
                name: err.name
            },
            { status: 500 }
        );
    }
}