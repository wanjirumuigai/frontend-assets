'use client'
import React, { useEffect, useState } from 'react'
import { Button, Table } from '@mantine/core';
import { IconEye, IconEdit, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import Fuse from 'fuse.js';

const options = {
    includeScore: true,
    keys: ['assetName', 'model', 'tag', 'category'],
  };
const ShowAssets = () => {

    const [assets, setAssets] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        const fetchMovies = async () => {
          const res = await fetch('http://localhost:3000/assets');
          const data = await res.json();
         setAssets(data)
        };

        fetchMovies();
      }, []);

      const fuse = new Fuse(assets, options);
      const ths = (
        <tr>

          <th>Asset Name</th>
          <th>Model</th>
          <th>Asset Tag</th>
          <th>Serial No.</th>
          <th>Category</th>
          <th>Purchase Price</th>
          <th>Actions</th>
        </tr>
      );

      const rows = assets.map((element) => (
        <tr key={element.id} id={element.id}>

            <td>{element.assetName}</td>
          <td>{element.model}</td>
          <td>{element.tag}</td>
          <td>{element.serialNumber}</td>
          <td>{element.category}</td>
          <td>{element.purchasePrice}</td>
          <td>       <Button.Group >
      <Button variant='outline' onClick={() => handleRowClick(element.id)} leftIcon={<IconEye size="1rem" />}>View</Button>
      <Button variant='outline' leftIcon={<IconEdit size="1rem" />}>Edit</Button>

    </Button.Group></td>
        </tr>
      ));




function handleRowClick(id) {
    router.push(`/view/${id}`)
}

function handleViewButton(id) {
    console.log(id)
}

function handleSearch(e) {
    setSearchTerm(e.target.value)
}

console.log(searchTerm)


  return (
    <>

    <form className='ml-4 mt-5'>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input  type="search" name='searchTerm' onKeyDown={handleSearch} id="default-search" value={searchTerm}  class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>

    </div>
</form>
    <div className='ml-4'>
    <Table captionSide="up" striped highlightOnHover horizontalSpacing="sm" verticalSpacing="sm" fontSize="md">
    <caption>List of Assets</caption>
    <thead>{ths}</thead>
    <tbody >{rows}</tbody>
    <tfoot>{ths}</tfoot>
  </Table>
  </div>
  </>
  )
}

export default ShowAssets
