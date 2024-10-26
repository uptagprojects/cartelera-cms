"use client";

import { File } from "lucide-react";
import { Button, TextArea, TextInput } from "octagon-ui";
import { useState } from "react";

export function NewGuide() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [attachment, setAttachment] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setAttachment(selectedFile);
		}
	};

	const handleUpload = () => {
		// Placeholder for Dropbox upload functionality
		//console.log("Uploading blog post:");
		//console.log("Title:", title);
		//console.log("Content:", content);
		//console.log("Attachment:", attachment);
		attachment;
		// Here you would typically implement the actual Dropbox API call
		alert("Blog post upload functionality would be implemented here.");
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Create Blog Post</h2>
			<div className="space-y-4">
				<div>
					<TextInput
						label="post title"
						placeholder="Enter post title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<TextArea
						label="content"
						placeholder="Write your blog post here..."
						value={content}
						onChange={e => setContent(e.target.value)}
						className="min-h-[300px]"
					/>
				</div>
				<div>
					<label htmlFor="attachment">Attachment (optional)</label>
					<input
						type="file"
						onChange={handleFileChange}
						className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
					/>
				</div>
				<Button
					onClick={handleUpload}
					className="w-full"
					disabled={!title || !content}
					label="Upload to Dropbox"
				/>
			</div>
		</div>
	);
}
