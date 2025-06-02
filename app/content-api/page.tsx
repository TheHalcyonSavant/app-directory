'use client';

import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { getCategories } from '#/app/api/categories/getCategories';

const CLIENT_ID = '238496494313-i5940tm2kldac3oan9dsc26ob0tm0ob1.apps.googleusercontent.com'; // Get this from Google Cloud Console
// const API_KEY = 'AIzaSyANf8LCfL2lh2LCFVOACR-ux7Ccub8JL8E'; // If you're using public APIs without user data
const MERCHANT_ID = '5595215932';

const GoogleAuthComponent = () => {
  const [products, setProducts] = useState('');

  async function start() {
    gapi.load('client', async () => {
      await gapi.client.load('https://shoppingcontent.googleapis.com/$discovery/rest?version=v2.1');
      // 'https://content.googleapis.com/discovery/v1/apis/content/v2.1/rest'
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/content',
        callback: (response) => {
          if (response.error) {
            console.error('Token error:', response);
            return;
          }

          (gapi.client as any).setToken({ access_token: response.access_token });
          console.log('Access token obtained and set.', response.access_token);
          // listProducts();
        },
      }).requestAccessToken();
    });
  }

  async function listProducts() {
    return gapi.client.content.products.list({ // productstatuses
      merchantId: MERCHANT_ID,
      // maxResults: 1
    }).then(response => {
      setProducts(JSON.stringify(response.result, null, 2));
    }).catch(err => {
      console.error('Error listing products', err);
    });
  }

  async function update() {
    gapi.client.content.products.update({
      merchantId: MERCHANT_ID,
      productId: 'online:de:CH:A3B5',
      updateMask: 'gender',
      resource: {
        gender: 'male'
      }
    })
    .then(response => {
      console.log('Product updated successfully', response);
      listProducts();
      // setProducts(JSON.stringify(response.result, null, 2));
    })
    .catch(err => console.error('Error updating product', err));
  }

  async function insert() {
    gapi.client.content.products.insert({
      merchantId: MERCHANT_ID,
      resource: {
        id: 'online:de:CH:A3B6',
        offerId: 'A3B6',
        title: 'Test Product',
        description: 'This is a test product',
        link: 'https://example.com/product',
        imageLink: 'https://example.com/product.jpg',
        contentLanguage: 'de',
        targetCountry: 'CH',
        channel: 'online',
        availability: 'in stock',
        price: {
          value: '19.99',
          currency: 'CHF'
        },
        brand: 'Test Brand',
        gtin: '1234567890123',
        mpn: 'MPN12345',
        condition: 'new',
      }
    }).then(response => {
      console.log('Product inserted:', response.result);
    }).catch(error => {
      console.error('Error inserting product:', error);
    });
  }

  async function batchGet() {
    gapi.client.content.products.custombatch({
      resource: {
        entries: [
          {
            batchId: 1,
            merchantId: MERCHANT_ID,
            method: 'get',
            productId: 'online:de:CH:A3B5'
          },
          {
            batchId: 2,
            merchantId: MERCHANT_ID,
            method: 'get',
            productId: 'online:de:CH:A3B6'
          }
        ]
      }
    })
    .then(response => {
      console.log('batch response:', response);
    }).catch(error => {
      console.error('Error inserting product:', error);
    });
  }

  return (
    <div>
      <Script src="https://accounts.google.com/gsi/client" />
      <Script src="https://apis.google.com/js/api.js" />
      <button className='bg-blue-500 rounded mr-2' onClick={start}>Authorize & Load</button>
      <button onClick={update}>Update</button>
      <button onClick={insert}>Insert</button>
      <button className='border-solid border-4 border-gray-600 rounded-xl ml-2' onClick={batchGet}>Batch Request</button>
      <pre>{products}</pre>
    </div>
  );
};

export default GoogleAuthComponent;