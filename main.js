import express from 'express';
import axios from 'axios';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

const app= express();
const PORT= 3000;

app.get("/generate-csv", async(req,res)=> {
    try {
        const [userResponses, postsResponse, commentResponse] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/users'),
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/comments'),
        ]);
        
        const users= userResponses.data;
        const posts= postsResponse.data;
        const comments= commentResponse.data;

        const data= users.map(user=> {
            const post= posts.find(p=> p.id===user.id);
            const comment= comments.find(c=> c.id===user.id);
            return {
                id: user.id,
                name: user.name,
                title: post.title,
                body: comment.body,
            };
        });

        const csvWriter= createObjectCsvWriter({
            path: 'result.csv',
            header: [
                {id: 'name', title: 'Name'},
                {id: 'title', title: 'Title'},
                {id: 'body', title: 'Body'},
            ],
        });
        await csvWriter.writeRecords(data);
        res.json({ filePath: path.resolve('result.csv') });
    } catch(error) {
            console.error('Error generating CSV:', error.message);
            res.status(500).json({
                error: 'Failed to generate CSV file',
                details: error.message,
            });
        }
    });
app.listen(PORT, ()=>{
console.log(`Server is running on:${PORT}`);
});