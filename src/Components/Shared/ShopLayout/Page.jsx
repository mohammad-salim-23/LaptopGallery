import React from 'react'
import useProducts from '../../../hooks/useProducts'
import ShopLayout from './ShopLayout'

const Page = () => {
    const product = useProducts()
    console.log(product)
  return (
    <div>
        <ShopLayout items={product} title='Products'></ShopLayout>
    </div>
  )
}

export default Page
