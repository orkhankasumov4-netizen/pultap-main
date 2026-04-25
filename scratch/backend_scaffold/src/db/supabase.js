"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl) {
    console.warn('⚠️ Warning: SUPABASE_URL is missing in .env');
}
// We use service role key if available, otherwise fallback to anon key
const keyToUse = supabaseServiceKey || supabaseAnonKey;
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl || 'YOUR_SUPABASE_URL', keyToUse || 'YOUR_SUPABASE_KEY');
//# sourceMappingURL=supabase.js.map