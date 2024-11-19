import axios from "axios";
import { Octokit } from "octokit";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const octokit = new Octokit();
