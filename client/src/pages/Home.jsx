import React from 'react'
import Card from './Card'

const Home = () => {
  return (
    <div className='grid gap-4 px-12 py-10' style={{gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))"}}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default Home