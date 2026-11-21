const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/premium/:username', async (req, res) => {
  const { data } = await supabase.from('users').select('is_premium').eq('username', req.params.username).single();
  res.json({ is_premium: data?.is_premium || false });
});

app.get('/api/posts', async (req, res) => {
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(50);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/posts', async (req, res) => {
  const { username, content, image_url, is_premium } = req.body;
  const { data, error } = await supabase.from('posts').insert([{ username, content, image_url, likes: 0, is_premium: is_premium || false }]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/like/:id', async (req, res) => {
  const { data: post } = await supabase.from('posts').select('likes').eq('id', req.params.id).single();
  if (!post) return res.status(404).json({ error: 'not found' });
  const { data, error } = await supabase.from('posts').update({ likes: (post.likes || 0) + 1 }).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/comments/:post_id', async (req, res) => {
  const { data, error } = await supabase.from('comments').select('*').eq('post_id', req.params.post_id).order('created_at', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/comments', async (req, res) => {
  const { post_id, username, content } = req.body;
  const { data, error } = await supabase.from('comments').insert([{ post_id, username, content }]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('VibeZone-3 PREMIUM running on ' + PORT));
