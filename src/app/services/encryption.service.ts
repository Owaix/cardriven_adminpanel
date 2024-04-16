import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {

  constructor() { } // Inject a secure secret key
  encrypt(data: any): string {
    const encryptedCardDetails = CryptoJS.AES.encrypt(JSON.stringify({ data }), 'tG@Y3hu9$lK#zP2q&vW5nBx!sF8mR6t').toString();
    return encryptedCardDetails;
  }
}