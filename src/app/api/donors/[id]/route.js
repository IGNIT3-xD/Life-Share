import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        // console.log("ID received:", id);

        const client = await clientPromise;
        const db = client.db("LifeShare");
        const donor = await db.collection("donor_list").findOne({ _id: new ObjectId(id) });

        if (!donor) {
            return NextResponse.json({ error: "Donor not found" }, { status: 404 });
        }

        return NextResponse.json(donor);

    } catch (err) {
        console.error("Error fetching donor:", err);
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}