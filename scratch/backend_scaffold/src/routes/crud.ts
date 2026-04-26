import { Router } from 'express';
import { supabase } from '../db/supabase';

export function createCrudRouter(tableName: string, idField: string = 'id') {
  const router = Router();

  // Get all
  router.get('/', async (req, res) => {
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) throw error;
      res.json(data ?? []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });


  // Get one
  router.get(`/:${idField}`, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(idField, req.params[idField])
        .single();
      if (error) throw error;
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create
  router.post('/', async (req, res) => {
    try {
      const { data, error } = await supabase.from(tableName).insert([req.body]).select();
      if (error) throw error;
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update
  router.put(`/:${idField}`, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(req.body)
        .eq(idField, req.params[idField])
        .select();
      if (error) throw error;
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete
  router.delete(`/:${idField}`, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .delete()
        .eq(idField, req.params[idField])
        .select();
      if (error) throw error;
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
