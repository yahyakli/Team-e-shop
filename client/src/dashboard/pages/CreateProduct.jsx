import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const productSchema = z.object({
  name: z.string().nonempty({ message: 'Product name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  image_url: z.string(),
  quantity: z
    .number({ invalid_type_error: 'Quantity must be a number' })
    .min(1, { message: 'Quantity must be at least 1' }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid price format' }),
});

function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    console.log('Product data:', data);
    try {
      const response = await axios.post("http://localhost:3000/api/products", data);
      if (response.status === 201) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div>
    <h2 className='text-2xl font-bold mx-3 mt-3 mb-10'>Create Product</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-4 border rounded">
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block font-medium">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="image_url" className="block font-medium">
          Image URL
        </label>
        <input
          type="text"
          id="image_url"
          {...register('image_url')}
          className="w-full p-2 border rounded"
        />
        {errors.image_url && (
          <p className="text-red-500 text-sm">{errors.image_url.message}</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block font-medium">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          {...register('quantity', { valueAsNumber: true })}
          className="w-full p-2 border rounded"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block font-medium">
          Price
        </label>
        <input
          type="text"
          id="price"
          {...register('price')}
          className="w-full p-2 border rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Create Product
      </button>
    </form>
  </div>
  );
}

export default CreateProduct;
