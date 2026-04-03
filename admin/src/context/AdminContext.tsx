import React, { createContext, useState, useEffect } from 'react';

type AdminContextType = {
  products: any[];
  orders: any[];
  getProductsData: () => Promise<void>;
  getAllOrders: () => Promise<void>;
  addProducts: (formData: any) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<void>;
  updateStatus: (id: string, newStatus: string) => Promise<void>;
  backendUrl: string;
};

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const backendUrl = "http://localhost:3000";

  const getProductsData = async () => {
    try {
      const res = await fetch(backendUrl + '/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await fetch(backendUrl + '/api/admin/allorders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProducts = async (formData: any): Promise<boolean> => {
    try {
        let imagesData = new FormData();
        Array.from(formData.images as FileList).forEach((file: any) => {
             imagesData.append("images", file);
        });

        const imageUploadRes = await fetch(backendUrl + "/api/admin/uploadimages", {
            method: 'POST',
            body: imagesData
        });
        const imageUploadData = await imageUploadRes.json();
        
        if (imageUploadData.success) {
            let data = {
                ...formData,
                images: imageUploadData.urls
            }
            const addProductRes = await fetch(backendUrl + '/api/admin/addproducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const addProductData = await addProductRes.json();

            if(addProductData.success) {
                await getProductsData();
                return true;
            }
        }
        return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const deleteProduct = async (id: string) => {
    try {
        const res = await fetch(backendUrl + '/api/admin/deleteproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        const data = await res.json();
        if (data.success) {
            await getProductsData();
        }
    } catch(err) {
        console.log(err);
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
      try {
        const res = await fetch(backendUrl + '/api/admin/updatestatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, newStatus: newStatus})
        });
        const data = await res.json();
        if (data.success) {
            await getAllOrders();
        }
    } catch(err) {
        console.log(err);
    }
  }

  useEffect(() => {
    getProductsData();
    getAllOrders();
  }, []);

  return (
    <AdminContext.Provider value={{ products, orders, getProductsData, getAllOrders, addProducts, deleteProduct, updateStatus, backendUrl }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
