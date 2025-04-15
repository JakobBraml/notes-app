"use client"

import { useEffect } from "react";
import { supabase } from '/src/app/lib/supabaseClient.js';
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link";
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  async function addNote() {
    const noteElement = document.getElementById("new-note");
    const note = noteElement.value.trim();
    noteElement.value = "";
  
    if (!note) return;
  
    // Save to Supabase
    const { data, error } = await supabase
      .from("notes") // table name
      .insert([{ text: note }]);
  
    if (error) {
      console.error("Full Supabase Error:", JSON.stringify(error, null, 2));
      return;
    }
    
    const list = document.getElementById("list");
    const li = document.createElement("li");
    const text = document.createTextNode(note);
    li.appendChild(text);

    li.setAttribute("onclick", "this.remove()")

    list.style.display = 'block';
    
    list.appendChild(li);

  }

    // Function to delete a note from Supabase and from the UI
    async function deleteNote(noteId, liElement) {
      try {
        // Delete the note from Supabase
        const { error } = await supabase
          .from("notes")
          .delete()
          .eq("id", noteId);  // Use the note ID to delete the correct note
  
        if (error) {
          console.error("Error deleting from Supabase:", error);
          return;
        }
  
        // Remove the note from the UI (DOM)
        liElement.remove();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }

  // Fetch notes from Supabase on page load
  useEffect(() => {
    async function loadNotes() {
      // Fetching notes from Supabase
      const { data, error } = await supabase
        .from("notes")  // Fetch from "notes" table
        .select("*")
        .order("inserted_at", { ascending: false });

      if (error) {
        console.error("Error loading notes:", error.message || error);  // Log full error message
        return;
      }

      console.log("Fetched Notes:", data);  // Log the fetched data

      const list = document.getElementById("list");

      // Ensure that list is visible if data is present
      if (data.length > 0) {
        list.style.display = "block";  // Show the list
      }

      // Clear the list before adding new data
      list.innerHTML = "";

      // Add fetched notes to the list
      data.forEach(({ text }) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(text));
        li.setAttribute("onclick", "this.remove()");
        list.appendChild(li);
      });
    }

    loadNotes();
  }, []);  

  return (
    <div className="list-container min-h-screen pb-20 relative">
      <h2 className="title">NOTES</h2>
  
      <form className="row">
        <label htmlFor="new-note">New Note: </label>
        <input className="searchBox" type="text" id="new-note" name="new-note" />
        <button className="button" type="button" onClick={addNote}>Create</button>
      </form>
  
      <ul className="list" id="list" style={{ display: 'none' }}></ul>
  
  export default function MarkdownEditor({ note, onChange }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <textarea
        className="w-full md:w-1/2 h-96 p-4 border rounded"
        value={note}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing your note in Markdown..."
      />
      <div className="w-full md:w-1/2 h-96 p-4 border bg-white overflow-auto rounded">
        <ReactMarkdown>{note}</ReactMarkdown>
      </div>
    </div>
  )
}
  
      <Analytics />

      <footer className="footer">
        <Link href="/home link">
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-2xl hover:bg-gray-700">
          Home
        </button>
        </Link>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-2xl hover:bg-gray-700">
          Edit
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-2xl hover:bg-gray-700">
          Create
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-2xl hover:bg-gray-700">
          Delete
        </button>
      </footer>
    </div>
  )
}  