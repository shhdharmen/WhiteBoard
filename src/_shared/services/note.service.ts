import { authHeader } from "../helpers/auth-header";
import { AxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "../constants/api-endpoints.constant";
import { Observable } from "rxjs";
import * as Note from 'Note';
import HttpClient from "../helpers/http-client";

export const NoteService = {
    create,
    delete: _delete,
    get,
    getById,
    update
}

async function get() {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        url = API_ENDPOINTS.NOTE.GET;
    return new Observable<{ data: Note.RootObject[] }>(observer => {
        return new HttpClient(observer).get(url, options);
    });
}

async function getById(noteId: string) {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        url = API_ENDPOINTS.NOTE.GET + '/' + noteId;
    return new Observable<{ data: Note.RootObject }>(observer => {
        return new HttpClient(observer).get(url, options);
    });
}

async function create(note: Note.RootObject) {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        body = note,
        url = API_ENDPOINTS.NOTE.CREATE_POST;
    return new Observable<{ data: Note.RootObject[] }>(observer => {
        return new HttpClient(observer).post(url, options, body);
    });
}

async function _delete(noteId: string) {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        url = API_ENDPOINTS.NOTE.DELETE + '/' + noteId;
    return new Observable<{ data: Note.RootObject }>(observer => {
        return new HttpClient(observer).delete(url, options);
    });
}

async function update(note: Note.RootObject) {
    const options: AxiosRequestConfig = { headers: await authHeader() },
        { id, _id, ...noteToBeUpdated } = note,
        body = noteToBeUpdated,
        url = API_ENDPOINTS.NOTE.UPDATE_PUT + '/' + note.id;
    return new Observable<{ data: Note.RootObject[] }>(observer => {
        return new HttpClient(observer).put(url, options, body);
    });
}