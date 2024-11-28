import pkg from 'pg';
const { Pool } = pkg;
import { DB_CONFIG } from "../config/config.js";

export const pool = new Pool(DB_CONFIG);

