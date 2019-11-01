import { authHeader } from "../helpers/auth-header";
import { AxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "../constants/api-endpoints.constant";
import { Observable } from "rxjs";
import * as Note from 'Note';
import HttpClient from "../helpers/http-client";

export const NoteService = {
    get,
    create
}

async function get() {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        url = API_ENDPOINTS.NOTE.GET;
    return new Observable<{ data: Note.RootObject[] }>(observer => {
        return new HttpClient(observer).get(url, options);
    });
}

async function create(note: Note.RootObject) {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        body = note,
        url = API_ENDPOINTS.NOTE.POST;
    return new Observable<{ data: Note.RootObject[] }>(observer => {
        return new HttpClient(observer).post(url, options, body);
    });
}