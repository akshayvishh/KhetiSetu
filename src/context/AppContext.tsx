import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  ProduceListing,
  CartItem,
  Order,
  DeliveryRequest,
  JobListing,
  JobApplication,
  MandiRate,
  ToastMessage,
  OrderStatus,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PRODUCE,
  INITIAL_ORDERS,
  INITIAL_DELIVERIES,
  INITIAL_JOBS,
  INITIAL_MANDI_RATES,
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  produceListings: ProduceListing[];
  cart: CartItem[];
  orders: Order[];
  deliveries: DeliveryRequest[];
  jobs: JobListing[];
  jobApplications: JobApplication[];
  mandiRates: MandiRate[];
  toasts: ToastMessage[];
  // Role & Auth actions
  setCurrentUser: (user: UserProfile | null) => void;
  switchRole: (role: UserRole) => void;
  registerUser: (newUser: Omit<UserProfile, 'id' | 'isVerified' | 'joinedDate'>) => UserProfile;
  logout: () => void;
  toggleUserVerification: (userId: string) => void;
  // Produce actions
  addProduceListing: (listing: Omit<ProduceListing, 'id' | 'createdAt'>) => void;
  updateProduceListing: (id: string, updates: Partial<ProduceListing>) => void;
  deleteProduceListing: (id: string) => void;
  // Cart actions
  addToCart: (produce: ProduceListing, quantity: number) => void;
  updateCartQuantity: (produceId: string, quantity: number) => void;
  removeFromCart: (produceId: string) => void;
  clearCart: () => void;
  cartTotalAmount: number;
  cartTotalItemsCount: number;
  // Order actions
  createOrder: (orderData: {
    deliveryAddress: Order['deliveryAddress'];
    paymentMethod: Order['paymentMethod'];
    deliveryDate: string;
  }) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  // Delivery actions
  acceptDelivery: (deliveryId: string) => void;
  updateDeliveryStatus: (deliveryId: string, status: DeliveryRequest['status']) => void;
  uploadDeliveryDocument: (
    deliveryId: string,
    docType: 'invoice' | 'receipt' | 'weightSlip' | 'lrCopy',
    fileName: string
  ) => void;
  requestLogisticsForOrder: (orderId: string, vehicleType: 'tempo' | 'truck' | 'refrigerated') => void;
  // Job actions
  postJob: (job: Omit<JobListing, 'id' | 'postedDate' | 'applicantsCount'>) => void;
  applyForJob: (jobId: string, application: { name: string; phone: string; location: string; experience: number; notes: string }) => void;
  // Toast notifications
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  dismissToast: (id: string) => void;
  // State reset
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'khetisetu_users_v1',
  CURRENT_USER_ID: 'khetisetu_current_user_id_v1',
  PRODUCE: 'khetisetu_produce_v1',
  CART: 'khetisetu_cart_v1',
  ORDERS: 'khetisetu_orders_v1',
  DELIVERIES: 'khetisetu_deliveries_v1',
  JOBS: 'khetisetu_jobs_v1',
  APPLICATIONS: 'khetisetu_applications_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Users & Current User
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved !== null ? saved : 'user-farmer-1'; // Default to Ramesh Patil for rich immediate experience
  });

  // 2. Produce
  const [produceListings, setProduceListings] = useState<ProduceListing[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCE);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCE;
  });

  // 3. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 5. Deliveries
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    return saved ? JSON.parse(saved) : INITIAL_DELIVERIES;
  });

  // 6. Jobs
  const [jobs, setJobs] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : [];
  });

  // Mandi rates static reference
  const [mandiRates] = useState<MandiRate[]>(INITIAL_MANDI_RATES);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(produceListings));
  }, [produceListings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(jobApplications));
  }, [jobApplications]);

  // Derived current user
  const currentUser = users.find((u) => u.id === currentUserId) || null;

  // Toast helper
  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Role switching
  const switchRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUserId('');
      showToast('info', 'Browsing as Guest', 'Switched to unauthenticated visitor mode.');
      return;
    }
    const matchingUser = users.find((u) => u.role === role);
    if (matchingUser) {
      setCurrentUserId(matchingUser.id);
      showToast(
        'success',
        `Switched to ${role.toUpperCase()}`,
        `Now operating as ${matchingUser.name} (${matchingUser.district})`
      );
    }
  };

  const logout = () => {
    setCurrentUserId('');
    showToast('info', 'Signed Out', 'You have been signed out to visitor mode.');
  };

  const registerUser = (newUser: Omit<UserProfile, 'id' | 'isVerified' | 'joinedDate'>): UserProfile => {
    const id = `user-${newUser.role}-${Date.now().toString(36)}`;
    const created: UserProfile = {
      ...newUser,
      id,
      isVerified: false,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [...prev, created]);
    setCurrentUserId(id);
    showToast('success', 'Registration Complete', `Welcome to KhetiSetu, ${created.name}! Account created in test mode.`);
    return created;
  };

  const toggleUserVerification = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextState = !u.isVerified;
          showToast(
            'info',
            'Verification Updated',
            `${u.name} is now ${nextState ? 'Verified' : 'Pending Verification'}.`
          );
          return { ...u, isVerified: nextState };
        }
        return u;
      })
    );
  };

  // Produce Actions
  const addProduceListing = (listingData: Omit<ProduceListing, 'id' | 'createdAt'>) => {
    const newListing: ProduceListing = {
      ...listingData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProduceListings((prev) => [newListing, ...prev]);
    showToast('success', 'Harvest Listed', `${newListing.cropName} is now visible on the Buyer Marketplace.`);
  };

  const updateProduceListing = (id: string, updates: Partial<ProduceListing>) => {
    setProduceListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('info', 'Listing Updated', 'Produce listing details have been saved.');
  };

  const deleteProduceListing = (id: string) => {
    setProduceListings((prev) => prev.filter((item) => item.id !== id));
    showToast('warning', 'Listing Removed', 'Produce listing has been removed from marketplace.');
  };

  // Cart Actions
  const addToCart = (produce: ProduceListing, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.produce.id === produce.id);
      if (existing) {
        return prev.map((item) =>
          item.produce.id === produce.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { produce, quantity }];
    });
    showToast('success', 'Added to Cart', `${quantity} ${produce.unit} of ${produce.cropName} added.`);
  };

  const updateCartQuantity = (produceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(produceId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.produce.id === produceId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (produceId: string) => {
    setCart((prev) => prev.filter((item) => item.produce.id !== produceId));
    showToast('info', 'Item Removed', 'Product removed from your purchase order cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalAmount = cart.reduce(
    (sum, item) => sum + item.produce.pricePerUnit * item.quantity,
    0
  );

  const cartTotalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders
  const createOrder = (orderData: {
    deliveryAddress: Order['deliveryAddress'];
    paymentMethod: Order['paymentMethod'];
    deliveryDate: string;
  }): Order | null => {
    if (cart.length === 0) return null;

    const buyerName = currentUser?.name || 'Vashi Agro Buyer';
    const buyerPhone = currentUser?.phone || '+91 98190 44211';
    const buyerId = currentUser?.id || 'user-buyer-1';

    const orderNumber = `KS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderItems = cart.map((item) => ({
      produceId: item.produce.id,
      cropName: item.produce.cropName,
      farmerName: item.produce.farmerName,
      farmerId: item.produce.farmerId,
      quantity: item.quantity,
      unit: item.produce.unit,
      pricePerUnit: item.produce.pricePerUnit,
      subtotal: item.produce.pricePerUnit * item.quantity,
      imageUrl: item.produce.imageUrl,
    }));

    const totalProduce = cartTotalAmount;
    const estLogistics = Math.round(1200 + totalProduce * 0.04);
    const grand = totalProduce + estLogistics;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      buyerId,
      buyerName,
      buyerPhone,
      deliveryAddress: orderData.deliveryAddress,
      items: orderItems,
      totalProduceAmount: totalProduce,
      estimatedLogisticsCost: estLogistics,
      platformFee: 0,
      grandTotal: grand,
      status: 'pending',
      paymentMethod: orderData.paymentMethod,
      paymentStatus:
        orderData.paymentMethod === 'Simulated Escrow'
          ? 'Escrow Secured'
          : 'Pending on Delivery',
      deliveryDate: orderData.deliveryDate,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          title: 'Order Placed (Simulated Checkout)',
          description: `Order placed for ${orderItems.length} items. Direct farm booking confirmed.`,
          timestamp: 'Just now',
          completed: true,
        },
        {
          title: 'Farmer Confirmation',
          description: 'Awaiting farmer acceptance and harvest schedule confirmation.',
          timestamp: 'Pending',
          completed: false,
        },
        {
          title: 'Logistics Transport Dispatch',
          description: 'Hauler vehicle allocation for farm gate pickup.',
          timestamp: 'Pending',
          completed: false,
        },
        {
          title: 'Delivered & Inspected',
          description: 'Quality verification and digital receipt handover.',
          timestamp: 'Pending',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Automatically create a corresponding logistics delivery request
    const firstItem = orderItems[0];
    const newDelivery: DeliveryRequest = {
      id: `del-${Date.now()}`,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      pickupLocation: {
        farmerName: firstItem.farmerName,
        address: 'Farm Gate Depot',
        district: 'Nashik',
        phone: '+91 98220 14829',
      },
      dropLocation: {
        buyerName: newOrder.buyerName,
        address: `${newOrder.deliveryAddress.street}, ${newOrder.deliveryAddress.city}`,
        district: newOrder.deliveryAddress.district,
        phone: newOrder.buyerPhone,
      },
      cropDetails: `${firstItem.cropName} — ${firstItem.quantity} ${firstItem.unit}`,
      totalWeightKg: firstItem.unit === 'tonne' ? firstItem.quantity * 1000 : firstItem.quantity,
      vehicleTypeRequired: 'tempo',
      distanceKm: 145,
      estimatedEarnings: estLogistics,
      status: 'available',
      pickupTimeWindow: 'Tomorrow, 07:00 AM - 10:00 AM',
      documents: {
        invoiceUploaded: false,
        receiptUploaded: false,
        weightSlipUploaded: false,
        lrCopyUploaded: false,
      },
      mockGps: {
        currentLat: 19.9975,
        currentLng: 73.7898,
        currentLocationName: 'Awaiting Transporter Assignment',
        speedKmH: 0,
        etaMinutes: 180,
        progressPercentage: 0,
      },
      createdAt: new Date().toISOString(),
    };

    setDeliveries((prev) => [newDelivery, ...prev]);
    clearCart();

    showToast(
      'success',
      'Order Confirmed!',
      `Order ${orderNumber} placed. Delivery request dispatched to logistics network.`
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = [...ord.timeline];
          if (status === 'accepted') {
            updatedTimeline.push({
              title: 'Farmer Accepted Order',
              description: note || 'Farmer confirmed harvest & packing.',
              timestamp: 'Just now',
              completed: true,
            });
          } else if (status === 'in_transit') {
            updatedTimeline.push({
              title: 'Cargo In Transit',
              description: note || 'Consignment loaded on transport vehicle.',
              timestamp: 'Just now',
              completed: true,
            });
          } else if (status === 'delivered') {
            updatedTimeline.push({
              title: 'Order Delivered Successfully',
              description: note || 'Consignment handed over to buyer.',
              timestamp: 'Just now',
              completed: true,
            });
          }

          return { ...ord, status, timeline: updatedTimeline };
        }
        return ord;
      })
    );
    showToast('info', 'Order Status Updated', `Order #${orderId.slice(-4)} marked as ${status.replace('_', ' ')}.`);
  };

  // Logistics
  const acceptDelivery = (deliveryId: string) => {
    const driver = currentUser?.role === 'delivery' ? currentUser : users.find((u) => u.role === 'delivery')!;
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === deliveryId) {
          return {
            ...d,
            status: 'accepted',
            assignedDriverId: driver.id,
            assignedDriverName: driver.name,
            assignedDriverPhone: driver.phone,
            vehicleNumber: driver.vehicleNumber || 'MH 15 GH 4821',
            mockGps: {
              ...d.mockGps,
              currentLocationName: 'Driver en route to pickup farm',
              speedKmH: 35,
              progressPercentage: 15,
            },
          };
        }
        return d;
      })
    );
    showToast(
      'success',
      'Delivery Accepted',
      `Assigned to ${driver.name}. Navigate to Pickup Depot.`
    );
  };

  const updateDeliveryStatus = (deliveryId: string, status: DeliveryRequest['status']) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === deliveryId) {
          const newGps = { ...d.mockGps };
          if (status === 'in_transit') {
            newGps.speedKmH = 55;
            newGps.progressPercentage = 60;
            newGps.currentLocationName = 'On Highway (Expressway Corridor)';
          } else if (status === 'delivered') {
            newGps.speedKmH = 0;
            newGps.progressPercentage = 100;
            newGps.currentLocationName = 'Delivered at Buyer Destination';
          }
          return { ...d, status, mockGps: newGps };
        }
        return d;
      })
    );

    // Also update order status if matched
    const targetDel = deliveries.find((d) => d.id === deliveryId);
    if (targetDel) {
      if (status === 'in_transit') updateOrderStatus(targetDel.orderId, 'in_transit');
      if (status === 'delivered') updateOrderStatus(targetDel.orderId, 'delivered');
    }

    showToast('info', 'Delivery Milestoned', `Logistics status updated to ${status.replace('_', ' ')}.`);
  };

  const uploadDeliveryDocument = (
    deliveryId: string,
    docType: 'invoice' | 'receipt' | 'weightSlip' | 'lrCopy',
    fileName: string
  ) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === deliveryId) {
          const docs = { ...d.documents };
          if (docType === 'invoice') {
            docs.invoiceUploaded = true;
            docs.invoiceName = fileName;
          }
          if (docType === 'receipt') {
            docs.receiptUploaded = true;
            docs.receiptName = fileName;
          }
          if (docType === 'weightSlip') {
            docs.weightSlipUploaded = true;
            docs.weightSlipName = fileName;
          }
          if (docType === 'lrCopy') {
            docs.lrCopyUploaded = true;
            docs.lrCopyName = fileName;
          }
          return { ...d, documents: docs };
        }
        return d;
      })
    );
    showToast('success', 'Document Attached', `${fileName} attached to delivery record.`);
  };

  const requestLogisticsForOrder = (orderId: string, vehicleType: 'tempo' | 'truck' | 'refrigerated') => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const item = order.items[0];
    const newDel: DeliveryRequest = {
      id: `del-${Date.now()}`,
      orderId: order.id,
      orderNumber: order.orderNumber,
      pickupLocation: {
        farmerName: item.farmerName,
        address: 'Farm Gate Loading Bay',
        district: 'Nashik',
        phone: '+91 98220 14829',
      },
      dropLocation: {
        buyerName: order.buyerName,
        address: `${order.deliveryAddress.street}, ${order.deliveryAddress.city}`,
        district: order.deliveryAddress.district,
        phone: order.buyerPhone,
      },
      cropDetails: `${item.cropName} (${item.quantity} ${item.unit})`,
      totalWeightKg: item.unit === 'tonne' ? item.quantity * 1000 : item.quantity,
      vehicleTypeRequired: vehicleType,
      distanceKm: 170,
      estimatedEarnings: order.estimatedLogisticsCost || 3500,
      status: 'available',
      pickupTimeWindow: 'Immediate Dispatch',
      documents: {
        invoiceUploaded: false,
        receiptUploaded: false,
        weightSlipUploaded: false,
        lrCopyUploaded: false,
      },
      mockGps: {
        currentLat: 19.9975,
        currentLng: 73.7898,
        currentLocationName: 'Open Request for Haulers',
        speedKmH: 0,
        etaMinutes: 210,
        progressPercentage: 0,
      },
      createdAt: new Date().toISOString(),
    };
    setDeliveries((prev) => [newDel, ...prev]);
    showToast('success', 'Logistics Requested', `Broadcasting haulage request to verified ${vehicleType} drivers.`);
  };

  // Jobs
  const postJob = (jobData: Omit<JobListing, 'id' | 'postedDate' | 'applicantsCount'>) => {
    const newJob: JobListing = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
    };
    setJobs((prev) => [newJob, ...prev]);
    showToast('success', 'Job Opportunity Published', `${newJob.title} is now active.`);
  };

  const applyForJob = (
    jobId: string,
    appData: { name: string; phone: string; location: string; experience: number; notes: string }
  ) => {
    const job = jobs.find((j) => j.id === jobId);
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job?.title || 'Agricultural Position',
      applicantId: currentUser?.id || `applicant-${Date.now()}`,
      applicantName: appData.name,
      applicantPhone: appData.phone,
      applicantLocation: appData.location,
      experienceYears: appData.experience,
      notes: appData.notes,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
    };
    setJobApplications((prev) => [newApp, ...prev]);
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );
    showToast('success', 'Application Submitted', 'Your contact details have been sent to the employer.');
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUserId('user-farmer-1');
    setProduceListings(INITIAL_PRODUCE);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setDeliveries(INITIAL_DELIVERIES);
    setJobs(INITIAL_JOBS);
    setJobApplications([]);
    showToast('info', 'System Reset', 'Restored default Maharashtra agricultural sample datasets.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        produceListings,
        cart,
        orders,
        deliveries,
        jobs,
        jobApplications,
        mandiRates,
        toasts,
        setCurrentUser: (u) => setCurrentUserId(u?.id || ''),
        switchRole,
        registerUser,
        logout,
        toggleUserVerification,
        addProduceListing,
        updateProduceListing,
        deleteProduceListing,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalAmount,
        cartTotalItemsCount,
        createOrder,
        updateOrderStatus,
        acceptDelivery,
        updateDeliveryStatus,
        uploadDeliveryDocument,
        requestLogisticsForOrder,
        postJob,
        applyForJob,
        showToast,
        dismissToast,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
