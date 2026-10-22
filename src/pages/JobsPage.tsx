import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Truck,
  Plus,
  MapPin,
  Calendar,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobListing, JobCategory } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const JobsPage: React.FC = () => {
  const { jobs, postJob, applyForJob, currentUser, showToast } = useApp();

  // Search & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal States
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobListing | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobListing | null>(null);

  // Application Form State
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantPhone, setApplicantPhone] = useState(currentUser?.phone || '');
  const [applicantLocation, setApplicantLocation] = useState(currentUser?.location || 'Nashik');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [notes, setNotes] = useState('');

  // Post Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<JobCategory>('farm_worker');
  const [newLocation, setNewLocation] = useState(currentUser?.location || 'Baramati');
  const [newDistrict, setNewDistrict] = useState(currentUser?.district || 'Pune');
  const [newCompensation, setNewCompensation] = useState('₹700 / day + meals');
  const [newDuration, setNewDuration] = useState('20 Days (Harvest Season)');
  const [newOpenings, setNewOpenings] = useState<number>(5);
  const [newDescription, setNewDescription] = useState('');
  const [newReqs, setNewReqs] = useState('Punctual, Prior orchard or farm experience');

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory !== 'all' && job.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchLoc = job.location.toLowerCase().includes(q);
      const matchDist = job.district.toLowerCase().includes(q);
      const matchEmployer = job.employerName.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDist && !matchEmployer) return false;
    }
    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;
    if (!applicantName.trim() || !applicantPhone.trim()) {
      showToast('warning', 'Missing Details', 'Please enter your name and contact phone number.');
      return;
    }

    applyForJob(selectedJobForApply.id, {
      name: applicantName,
      phone: applicantPhone,
      location: applicantLocation,
      experience: experienceYears,
      notes,
    });

    setSelectedJobForApply(null);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('warning', 'Missing Title', 'Please enter a role title.');
      return;
    }

    postJob({
      title: newTitle,
      category: newCategory,
      employerId: currentUser?.id || 'user-farmer-1',
      employerName: currentUser?.farmName || currentUser?.name || 'Patil Agro',
      employerRole: currentUser?.role === 'farmer' ? 'farmer' : 'buyer',
      employerPhone: currentUser?.phone || '+91 98220 14829',
      location: newLocation,
      district: newDistrict,
      compensation: newCompensation,
      duration: newDuration,
      openings: newOpenings,
      description: newDescription || 'Looking for hardworking rural crew members with immediate onboarding.',
      requirements: newReqs.split(',').map((r) => r.trim()),
      status: 'open',
    });

    setIsPostModalOpen(false);
  };

  const getCategoryLabel = (cat: JobCategory) => {
    switch (cat) {
      case 'delivery_partner':
        return 'Logistics / Driver';
      case 'truck_tempo_rental':
        return 'Vehicle / Tempo Rental';
      case 'farm_worker':
        return 'Farm Labor & Harvesting';
      case 'agri_service':
        return 'Agricultural Services & Drones';
    }
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '2.2rem' }}>Agricultural Jobs & Workforce</h1>
            <p style={{ marginTop: '4px' }}>
              Connect with seasonal harvesting teams, agricultural vehicle rentals, and spraying technicians across Maharashtra rural talukas.
            </p>
          </div>

          <button onClick={() => setIsPostModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Post a Job Opportunity</span>
          </button>
        </div>

        {/* Filter bar */}
        <div
          className="card"
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-surface-lowest)',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <Search
              size={18}
              color="var(--color-on-surface-muted)"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, location, or employer..."
              className="form-input"
              style={{ paddingLeft: '38px' }}
            />
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Openings' },
              { id: 'farm_worker', label: 'Farm Labor' },
              { id: 'delivery_partner', label: 'Driver / Logistics' },
              { id: 'truck_tempo_rental', label: 'Vehicle Rental' },
              { id: 'agri_service', label: 'Agri Services' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className="btn btn-sm"
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: selectedCategory === tab.id ? 'var(--color-primary)' : 'var(--color-surface-low)',
                  color: selectedCategory === tab.id ? '#ffffff' : 'var(--color-on-surface)',
                  fontWeight: selectedCategory === tab.id ? 700 : 500,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="card card-hover"
              style={{
                padding: '24px',
                backgroundColor: 'var(--color-surface-lowest)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{ flex: '1 1 420px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Badge variant="primary">{getCategoryLabel(job.category)}</Badge>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)' }}>
                    Posted on {job.postedDate} • {job.openings} Openings
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{job.title}</h3>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '0.875rem',
                    color: 'var(--color-on-surface-variant)',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={16} color="var(--color-secondary)" />
                    <span>Employer: <strong>{job.employerName}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={16} color="var(--color-secondary)" />
                    <span>{job.location}, {job.district}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={16} color="var(--color-secondary)" />
                    <span>Duration: {job.duration}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-on-surface-variant)' }}>
                  {job.description}
                </p>
              </div>

              {/* Compensation & Action CTA */}
              <div
                style={{
                  textAlign: 'right',
                  minWidth: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                  }}
                >
                  {job.compensation}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                  {job.applicantsCount} applicants submitted
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button
                    onClick={() => setSelectedJobForDetail(job)}
                    className="btn btn-outline btn-sm"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedJobForApply(job);
                      setApplicantName(currentUser?.name || '');
                      setApplicantPhone(currentUser?.phone || '');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJobForDetail && (
        <Modal
          isOpen={!!selectedJobForDetail}
          onClose={() => setSelectedJobForDetail(null)}
          title={selectedJobForDetail.title}
          subtitle={`Offered by ${selectedJobForDetail.employerName} in ${selectedJobForDetail.location}, ${selectedJobForDetail.district}`}
          maxWidth="640px"
          footer={
            <button
              onClick={() => {
                const j = selectedJobForDetail;
                setSelectedJobForDetail(null);
                setSelectedJobForApply(j);
              }}
              className="btn btn-primary"
            >
              Proceed to Application
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                  Compensation
                </span>
                <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                  {selectedJobForDetail.compensation}
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                  Work Schedule
                </span>
                <div style={{ fontWeight: 800, color: 'var(--color-on-surface)', fontSize: '1.1rem' }}>
                  {selectedJobForDetail.duration}
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Job Scope & Description</h4>
              <p style={{ lineHeight: 1.6 }}>{selectedJobForDetail.description}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Candidate Requirements</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedJobForDetail.requirements.map((req, rIdx) => (
                  <li key={rIdx} style={{ fontSize: '0.9rem' }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-surface-container)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              Employer Phone: <strong>{selectedJobForDetail.employerPhone}</strong>
            </div>
          </div>
        </Modal>
      )}

      {/* Application Form Modal */}
      {selectedJobForApply && (
        <Modal
          isOpen={!!selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
          title={`Apply: ${selectedJobForApply.title}`}
          subtitle="Submit your contact details and agricultural experience."
          maxWidth="580px"
        >
          <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Dnyaneshwar Jadhav"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Current Taluka / City</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={applicantLocation}
                  onChange={(e) => setApplicantLocation(e.target.value)}
                  placeholder="e.g. Sinnar, Nashik"
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Relevant Experience (Years)</label>
              <input
                type="number"
                min={0}
                max={40}
                className="form-input"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Message / Equipment Availability</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Available immediately with 4 experienced crew members for onion harvesting."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setSelectedJobForApply(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Application
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Post Job Modal */}
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        title="Post Agricultural Job or Rental"
        subtitle="Broadcast to local farm workers, vehicle operators, and agri service providers."
        maxWidth="640px"
      >
        <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              required
              className="form-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Need 8 Harvesters for Pomegranate Orchard"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
              >
                <option value="farm_worker">Farm Workers & Harvest Labor</option>
                <option value="delivery_partner">Driver / Logistics Hauler</option>
                <option value="truck_tempo_rental">Truck / Tempo Rental</option>
                <option value="agri_service">Drone / Soil / Farm Service</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Number of Openings</label>
              <input
                type="number"
                min={1}
                className="form-input"
                value={newOpenings}
                onChange={(e) => setNewOpenings(Number(e.target.value))}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Location / Village</label>
              <input
                type="text"
                required
                className="form-input"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">District</label>
              <input
                type="text"
                required
                className="form-input"
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Compensation Terms</label>
              <input
                type="text"
                required
                className="form-input"
                value={newCompensation}
                onChange={(e) => setNewCompensation(e.target.value)}
                placeholder="e.g. ₹700 / day + lunch"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Contract Duration</label>
              <input
                type="text"
                required
                className="form-input"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                placeholder="e.g. 15 Days Harvest"
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Job Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Outline daily timings, farm location instructions, and expected work..."
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Requirements (comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={newReqs}
              onChange={(e) => setNewReqs(e.target.value)}
              placeholder="e.g. Orchard experience, Own pruning shears, Punctual"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsPostModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Job Listing
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
