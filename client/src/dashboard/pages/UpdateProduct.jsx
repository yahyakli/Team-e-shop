import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

function UpdateProduct() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      image_url: '',
      quantity: 1,
      price: '',
    },
  });

  // Fetch existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        const product = response.data;
        setInitialData(product);
        // Set the form fields with the existing product data
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('image_url', product.image_url);
        setValue('quantity', product.quantity);
        setValue('price', product.price.toString());
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log('Updated Product data:', data);
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, data);
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mx-3 mt-3 mb-10">Update Product</h2>
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
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
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
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
