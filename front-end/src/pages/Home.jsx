import React from 'react'
import Item from '../components/Item'

const Home = () => {
  return (
    <section>
    <div className="gap-8 mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] p-8">
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  </section>
  )
}

export default Home
