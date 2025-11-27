import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await clientPromise

        const params = req.nextUrl.searchParams
        const search = params.get('search')
        const bloodGroup = params.get('bloodGroup') ? decodeURIComponent(params.get('bloodGroup')) : null
        const status = params.get('status')

        let query = {}

        if (search) {
            query.name = { $regex: search, $options: 'i' }
        }
        if (bloodGroup) {
            query.bloodType = bloodGroup
        }
        if (status) {
            query.availability = status
        }

        const db = client.db('LifeShare');
        const donors = await db.collection('donor_list').find(query).toArray()

        return NextResponse.json(donors)
    }
    catch (error) {
        console.error("Mongo Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}