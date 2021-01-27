import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { base_url, apt_url } from "./config";

export interface PATH_DIRECTORY {
  atime: string,
  ctime: string,
  mtime: string,
  name: string,
  size: number,
}

@Injectable({
  providedIn: 'root'
})
export class GetDataServiceService {

  constructor(private http: HttpClient) { }


  /* ---------------------- || BELOW ARE ALL IN  ONE SERVICE METHODS || ------------------------*/


  public getData(url: any) {
    return this.http.get(url)
  }

  public PostData(data: Object, url: any) {
    return this.http.post(url,data)
  }

  public PatchData(data: Object, url: any) {
    return this.http.patch(url, data )
  }
  createDirectory2(postItem: any,url: any): any {
    // CREATE FILE DIRECTORY
    return this.http.post<PATH_DIRECTORY>(url, postItem)
  }
  // uploadDocImage(files: FileList, url: any) {
  //   var formData = new FormData();
  //   Array.from(files).forEach(f => formData.append('file', f))
  //   console.log("dsgdshgdhdfhdfhdfhdfhdhdhh", formData, url);
  //   return this.http.post(url, formData)
  // }

  public DeleteData(url: any) {
    return this.http.delete(url)
  }
}
