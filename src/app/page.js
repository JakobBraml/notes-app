'use client'

import { useEffect, useState } from 'react'
import { supabase } from '/src/app/lib/supabaseClient.js'
import ReactMarkdown from 'react-markdown'
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link"

export default function Home() {
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    async function loadNotes() {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("inserted_at", { ascending: false })

      if (error) {
        console.error("Error loading notes:", error)
        return
      }

      setNotes(data)
    }

    loadNotes()
  }, [])

  const addNote = async () => {
    if (!newNote.trim()) return

    const { data, error } = await supabase
      .from("notes")
      .insert([{ text: newNote.trim() }])
      .select()

    if (error) {
      console.error("Error adding note:", error)
      return
    }

    setNotes([...(data || []), ...notes])
    setNewNote('')
  }

  const deleteNote = async (id) => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting note:", error)
      return
    }

    setNotes(notes.filter(note => note.id !== id))
  }

  const startEditing = (note) => {
    setEditingId(note.id)
    setEditingText(note.text)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  const saveEdit = async () => {
    const { error } = await supabase
      .from("notes")
      .update({ text: editingText })
      .eq("id", editingId)

    if (error) {
      console.error("Error updating note:", error)
      return
    }

    setNotes(notes.map(n => n.id === editingId ? { ...n, text: editingText } : n))
    cancelEditing()
  }

  return (
    <div className="list-container min-h-screen pb-20 relative">
      <h2 className="title">NOTES</h2>
  
      <form className="row">
        <label htmlFor="new-note">New Note: </label>
        <input className="searchBox" type="text" id="new-note" name="new-note" onChange={(e) => setNewNote(e.target.value)}/>
        <button className="button" type="button" onClick={addNote}>Create</button>
      </form>
  
      <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="row">
              {editingId === note.id ? (
                <>
                  <textarea
                    className="w-full border p-2 rounded"
                    rows={5}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <ReactMarkdown>{note.text}</ReactMarkdown>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => startEditing(note)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

  
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