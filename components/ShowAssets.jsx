'use client'
import React, { useEffect, useState } from 'react'
import { Button, Table } from '@mantine/core';
import { IconEye, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
const ShowAssets = () => {

    const [assets, setAssets] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchMovies = async () => {
          const res = await fetch('http://localhost:3000/assets');
          const data = await res.json();
         setAssets(data)
        };

        fetchMovies();
      }, []);
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

  return (
    <div className='ml-4'>
    <Table captionSide="up" striped highlightOnHover horizontalSpacing="sm" verticalSpacing="sm" fontSize="md">
    <caption>List of Assets</caption>
    <thead>{ths}</thead>
    <tbody >{rows}</tbody>
    <tfoot>{ths}</tfoot>
  </Table>
  </div>
  )
}

export default ShowAssets
