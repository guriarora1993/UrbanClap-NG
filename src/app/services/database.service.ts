import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public firestore = getFirestore();
  public cartList: any = [];
  public dataKey = 'selectedCartData';
  public data: any = {};
  public dataSubject = new Subject<any>();

  constructor() {
    this.loadData();
  }

  public loadData() {
    const storedData = localStorage.getItem(this.dataKey);
    if (storedData) {
      this.data = JSON.parse(storedData);
    }
  }

  public saveData() {
    localStorage.setItem(this.dataKey, JSON.stringify(this.data));
    this.dataSubject.next(this.data);
  }

  getData() {
    return this.data;
  }

  updateData(newData: any) {
    this.data = { ...this.data, ...newData };
    this.saveData();
  }

  getDataObservable() {
    return this.dataSubject.asObservable();
  }
  async addServiceCart(
    collectionName: string,
    data: any,
    customDocName: string
  ): Promise<void> {
    try {
      const customDocRef = doc(this.firestore, collectionName, customDocName);
      await setDoc(customDocRef, data);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getSelectedCarts(
    collectionName: string,
    documentId: string
  ): Promise<any | null> {
    try {
      const documentRef = doc(this.firestore, collectionName, documentId);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        console.log('Exist');
        return { id: documentSnapshot.id, ...documentSnapshot.data() };
      } else {
        console.log('Exist not ', collectionName, documentId);

        return null;
      }
    } catch (e) {
      console.error('Error getting document: ', e);
      return null;
    }
  }

  public setCartDetail(store: any) {
    this.cartList = store;
  }

  public getCartData() {
    return this.cartList;
  }
}
