import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import PageHeader from '../components/PageHeader';
import { Package, Clock, MapPin, CreditCard } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total: number;
  payment_status: string;
  delivery_status: string;
  payment_method: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <PageHeader 
        title="My Profile" 
        description="Manage your account and view your orders"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-playfair mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-playfair mb-6">Order History</h2>
              {loading ? (
                <p className="text-center text-gray-500">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{order.order_number}</span>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            getStatusColor(order.delivery_status)
                          }`}>
                            {order.delivery_status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.payment_method === 'cod' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online'}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p>Total: {formatPrice(order.total)}</p>
                        <p>Payment Status: {order.payment_status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-playfair mb-4">Quick Links</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-md">
                  <Package size={20} />
                  <span>Track Orders</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-md">
                  <Clock size={20} />
                  <span>Order History</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-md">
                  <MapPin size={20} />
                  <span>Saved Addresses</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-md">
                  <CreditCard size={20} />
                  <span>Payment Methods</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}