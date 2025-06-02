'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Address {
  street: string;
  zip: string;
  city: string;
}

export default function Page() {
  const [addresses, setAdresses] = useState<Address[]>([]);

  useEffect(() => {
    // const fetchUsers = async () => {
    //   const response = await fetch('http://localhost:3001/users');
    //   const data = await response.json();
    //   console.log(data);
    // };

    // fetchUsers();
  }, [])

  const addAddress = () => {
    setAdresses((prev) => [...prev, {
      street: '',
      zip: '',
      city: ''
    }]);
  }

  const removeAddress = (index: number) => () => {
    setAdresses((prev) => {
      const newAddresses = [...prev];

      newAddresses.splice(index, 1);

      return newAddresses;
    });
  }

  const changeAddress = (index: number, field: 'street' | 'zip' | 'city') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdresses((prev) => {
      const newAddresses = [...prev];

      newAddresses[index] = {
        ...newAddresses[index],
        [field]: e.target.value
      };

      return newAddresses;
    });
  };

  const publish = async (formData: FormData) => {
    // const addressRegExp = key.match(/address\[([^\]]+)\]\[([^\]]+)\]/);
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        addresses,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('User created successfully');
    } else {
      console.error('Error creating user');
    }
  };

  return <div className={clsx('w-full', styles.container)}>
    <h2>Enter a new user:</h2>
    <form action={publish} className={clsx('flex flex-col text-black')}>
      <input type="text" placeholder="First Name" name="firstName" />
      <input type="text" placeholder="Last Name" name="lastName" />
      <button type="button" className={clsx('bg-purple-700 text-white max-w-max self-end p-2 my-2')} onClick={addAddress}>Add address</button>
      <div className='flex flex-col'>
        {addresses.map(({ street, zip, city }, index) => (
          <div className={clsx('flex flex-row my-2 self-end')}>
            <input type="text" placeholder="Street" name={`address[${index}][street]`} value={street} onChange={changeAddress(index, 'street')} />
            <input type="text" placeholder="Zip" name={`address[${index}][zip]`} value={zip} onChange={changeAddress(index, 'zip')} />
            <input type="text" placeholder="City" name={`address[${index}][city]`} value={city} onChange={changeAddress(index, 'city')} />
            <button type="button" className={clsx('bg-red-700 text-white px-4')} onClick={removeAddress(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button className={clsx('bg-blue-500 text-white mt-4')}>Submit</button>
    </form>
    </div>
}