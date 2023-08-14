import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private firestore = getFirestore();
  constructor() { }

  async addServiceCart(collectionName: string, data: any,customDocName: string): Promise<void> {
    try {
      const customDocRef = doc(this.firestore, collectionName, customDocName);
      await setDoc(customDocRef, data); 
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }


  async getSelectedCarts(collectionName: string, documentId: string): Promise<any | null> {
    try {
      const documentRef = doc(this.firestore, collectionName, documentId);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        console.log("Exist")
        return { id: documentSnapshot.id, ...documentSnapshot.data() };
      } else {
        console.log("Exist not ", collectionName, documentId)

        return null;
      }
    } catch (e) {
      console.error('Error getting document: ', e);
      return null;
    }
  }
}
