import React, { useState } from 'react'
import axios from 'axios'

export default function NewMemory(){
  const [form, setForm] = useState({ title:'', text:'', tags:'', occurredAt: new Date().toISOString().slice(0,10) })
  const onSubmit = async (e:any) => {
    e.preventDefault()
    const payload = { ...form, tags: form.tags.split(',').map((s:any)=>s.trim()).filter(Boolean), occurredAt: new Date(form.occurredAt) }
    try {
      await axios.post('/api/memories', payload)
      alert('Saved (if backend running)')
      window.history.back()
    } catch (err:any) {
      alert('Error: ' + (err.message||err))
    }
  }
  return (
    <form onSubmit={onSubmit} style={{maxWidth:600}}>
      <input placeholder='Title' value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}} />
      <textarea placeholder='Text' value={form.text} onChange={e=>setForm({...form, text:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}} />
      <input type='date' value={form.occurredAt} onChange={e=>setForm({...form, occurredAt:e.target.value})} style={{padding:8,marginBottom:8}} />
      <input placeholder='tags (comma separated)' value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}} />
      <button style={{padding:'8px 16px'}}>Save Memory</button>
    </form>
  )
}
