'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import departmentData from './addressesData.json';

interface Address {
  street: string;
  zip: string;
  city: string;
}

function FormComponent({
  addresses,
  setAdresses,
}: {
  addresses: Address[];
  setAdresses: React.Dispatch<React.SetStateAction<Address[]>>;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // console.log('formData', formData.get('city'), formData.get('zip'));
    // addresses.push({
    //   street: '',
    //   zip: formData.get('zip') as string,
    //   city: formData.get('city') as string,
    // });
    setAdresses((prev) => [
      ...prev,
      {
        street: '',
        zip: formData.get('zip') as string,
        city: formData.get('city') as string,
      },
    ]);
    // setAdresses(addresses);
  };

  return (
    <form className={clsx('flex flex-col text-black')} onSubmit={handleSubmit}>
      <input type="text" placeholder="City" name="city" />
      <input type="text" placeholder="Zip" name="zip" />

      <button className={clsx('mt-4 bg-blue-500 text-white')}>Add</button>
    </form>
  );
}

export default function Page() {
  const [addresses, setAdresses] = useState<Address[]>(departmentData);

  useEffect(() => {
    // const fetchUsers = async () => {
    //   const response = await fetch('http://localhost:3001/users');
    //   const data = await response.json();
    //   console.log(data);
    // };
    // fetchUsers();
  }, []);

  const addAddress = () => {
    setAdresses((prev) => [
      ...prev,
      {
        street: '',
        zip: '',
        city: '',
      },
    ]);
  };

  const removeAddress = (index: number) => () => {
    setAdresses((prev) => {
      const newAddresses = [...prev];

      newAddresses.splice(index, 1);

      return newAddresses;
    });
  };

  const changeAddress =
    (index: number, field: 'street' | 'zip' | 'city') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAdresses((prev) => {
        const newAddresses = [...prev];

        newAddresses[index] = {
          ...newAddresses[index],
          [field]: e.target.value,
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

  return (
    <div className={clsx('w-full', styles.container)}>
      <h2>Enter a new user:</h2>
      <FormComponent addresses={addresses} setAdresses={setAdresses} />
      <div className="flex flex-col">
        {addresses.map(({ street, zip, city }, index) => (
          <div className={clsx('my-2 flex flex-row self-end text-black')}>
            <input
              type="text"
              placeholder="Street"
              name={`address[${index}][street]`}
              value={street}
              onChange={changeAddress(index, 'street')}
            />
            <input
              type="text"
              placeholder="Zip"
              name={`address[${index}][zip]`}
              value={zip}
              onChange={changeAddress(index, 'zip')}
            />
            <input
              type="text"
              placeholder="City"
              name={`address[${index}][city]`}
              value={city}
              onChange={changeAddress(index, 'city')}
            />
            <button
              type="button"
              className={clsx('bg-red-700 px-4 text-white')}
              onClick={removeAddress(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={clsx(
            'my-2 max-w-max self-end bg-purple-700 p-2 text-white',
          )}
          onClick={addAddress}
        >
          Add address
        </button>
      </div>
    </div>
  );
}
