export type UserRole = 'farmer' | 'buyer' | 'delivery' | 'admin' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  location: string;
  district: string;
  state: string;
  avatar?: string;
  // Role specific fields
  farmName?: string;
  farmSizeAcres?: number;
  primaryCrops?: string[];
  businessName?: string;
  buyerType?: 'wholesale' | 'retailer' | 'processor' | 'restaurant' | 'individual';
  vehicleType?: 'tempo' | 'truck' | 'refrigerated';
  vehicleNumber?: string;
  operatingDistricts?: string[];
  joinedDate: string;
}

export type CropCategory = 'Vegetables' | 'Fruits' | 'Grains & Cereals' | 'Pulses' | 'Spices' | 'Cash Crops';

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerDistrict: string;
  cropName: string;
  variety?: string;
  category: CropCategory;
  quantityAvailable: number;
  unit: 'kg' | 'quintal' | 'crate' | 'tonne';
  pricePerUnit: number; // in INR
  minOrderQuantity: number;
  harvestDate: string;
  location: string;
  district: string;
  description: string;
  imageUrl: string;
  isOrganic: boolean;
  qualityGrade: 'Grade A+ (Export)' | 'Grade A (Premium)' | 'Grade B (Standard)';
  shelfLifeDays: number;
  status: 'active' | 'sold_out' | 'paused';
  createdAt: string;
}

export interface CartItem {
  produce: ProduceListing;
  quantity: number;
}

export type OrderStatus = 'pending' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';

export interface OrderItem {
  produceId: string;
  cropName: string;
  farmerName: string;
  farmerId: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  subtotal: number;
  imageUrl: string;
}

export interface OrderTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    district: string;
    pincode: string;
    landmark?: string;
  };
  items: OrderItem[];
  totalProduceAmount: number;
  estimatedLogisticsCost: number;
  platformFee: number; // ₹0
  grandTotal: number;
  status: OrderStatus;
  paymentMethod: 'Simulated Escrow' | 'Simulated Cash on Delivery' | 'Simulated UPI';
  paymentStatus: 'Escrow Secured' | 'Pending on Delivery';
  deliveryDate: string;
  createdAt: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  timeline: OrderTimelineEvent[];
}

export interface DeliveryRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  pickupLocation: {
    farmerName: string;
    address: string;
    district: string;
    phone: string;
  };
  dropLocation: {
    buyerName: string;
    address: string;
    district: string;
    phone: string;
  };
  cropDetails: string;
  totalWeightKg: number;
  vehicleTypeRequired: 'tempo' | 'truck' | 'refrigerated';
  distanceKm: number;
  estimatedEarnings: number; // INR
  status: 'available' | 'accepted' | 'in_transit' | 'delivered';
  assignedDriverId?: string;
  assignedDriverName?: string;
  assignedDriverPhone?: string;
  vehicleNumber?: string;
  pickupTimeWindow: string;
  documents: {
    invoiceUploaded: boolean;
    receiptUploaded: boolean;
    weightSlipUploaded: boolean;
    lrCopyUploaded: boolean;
    invoiceName?: string;
    receiptName?: string;
    weightSlipName?: string;
    lrCopyName?: string;
  };
  mockGps: {
    currentLat: number;
    currentLng: number;
    currentLocationName: string;
    speedKmH: number;
    etaMinutes: number;
    progressPercentage: number;
  };
  createdAt: string;
}

export type JobCategory = 'delivery_partner' | 'truck_tempo_rental' | 'farm_worker' | 'agri_service';

export interface JobListing {
  id: string;
  title: string;
  category: JobCategory;
  employerId: string;
  employerName: string;
  employerRole: 'farmer' | 'buyer' | 'logistics_hub' | 'agri_agency';
  employerPhone: string;
  location: string;
  district: string;
  compensation: string; // e.g. "₹800 / day" or "₹25,000 / month"
  duration: string; // e.g. "Harvest Season (20 days)" or "Ongoing full-time"
  openings: number;
  description: string;
  requirements: string[];
  status: 'open' | 'filled';
  postedDate: string;
  applicantsCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantId: string;
  applicantName: string;
  applicantPhone: string;
  applicantLocation: string;
  experienceYears: number;
  notes: string;
  appliedDate: string;
  status: 'submitted' | 'shortlisted' | 'contacted';
}

export interface MandiRate {
  crop: string;
  market: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
