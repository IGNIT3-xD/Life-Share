import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json()
        const client = await clientPromise
        // console.log(body);
        const db = client.db('LifeShare')
        const result = await db.collection('donor_list').insertOne(body)

        return NextResponse.json(
            { messege: 'Donor added successfully.', insertedId: result.insertedId },
            { status: 201 }
        )
    }
    catch (err) {
        return NextResponse.json(
            { err: 'Internal server error' },
            { status: 500 }
        )
    }
}