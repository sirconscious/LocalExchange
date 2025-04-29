'use client';

import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import FormField from '../../components/FormField';
import ImagePreview from '../../components/ImagePreview';
import { Upload, Check } from 'lucide-react';
import { toast } from "sonner";

const categories = [
  'Electronics', 'Home & Garden', 'Clothing', 'Sports', 
  'Beauty & Health', 'Toys', 'Automotive', 'Books', 'Other'
];

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('details');

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} image${newFiles.length > 1 ? 's' : ''} added!`);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    toast.info("Image removed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({ title, description, price, category, location, contactInfo, images });
      setIsSubmitting(false);
      
      toast.success("Product added successfully!", {
        description: "Your item has been listed on GlowMarket."
      });
      
      // Reset form or redirect
    }, 1500);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/80 via-white to-orange-50/50">
      {/* <NavBar /> */}
      
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block relative mb-3">
              <div className="absolute inset-0 bg-orange-200 rounded-full blur-2xl opacity-20"></div>
              <h1 className="relative text-4xl md:text-5xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                Add New Product
              </h1>
            </div>
            <p className="text-gray-500 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Fill out the details below to list your product on GlowMarket. 
              Quality listings sell faster!
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-2xl blur opacity-10 animate-pulse-light"></div>
            <div className="relative bg-white rounded-xl shadow-card p-6 md:p-8 lg:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl"></div>
              
              <div className="mb-6 border-b border-orange-100 pb-4">
                <div className="flex justify-center space-x-6">
                  <button 
                    onClick={() => handleSectionChange('details')} 
                    className={`py-2 px-4 relative font-medium transition-all duration-300 ${activeSection === 'details' ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
                  >
                    Product Details
                    {activeSection === 'details' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-scale-in"></span>
                    )}
                  </button>
                  <button 
                    onClick={() => handleSectionChange('photos')} 
                    className={`py-2 px-4 relative font-medium transition-all duration-300 ${activeSection === 'photos' ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
                  >
                    Photos
                    {activeSection === 'photos' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-scale-in"></span>
                    )}
                  </button>
                  <button 
                    onClick={() => handleSectionChange('contact')} 
                    className={`py-2 px-4 relative font-medium transition-all duration-300 ${activeSection === 'contact' ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
                  >
                    Location & Contact
                    {activeSection === 'contact' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 animate-scale-in"></span>
                    )}
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`transition-all duration-500 ${activeSection === 'details' ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <div className="space-y-6">
                    <FormField label="Title" htmlFor="title" required>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What are you selling?"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus transition-all duration-300 focus:scale-[1.01]"
                        required
                      />
                    </FormField>

                    <FormField label="Description" htmlFor="description" required>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your item (condition, features, etc.)"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 min-h-[120px] input-focus transition-all duration-300 focus:scale-[1.01]"
                        required
                      />
                    </FormField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Price" htmlFor="price" required>
                        <div className="relative group">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-orange-500 transition-colors duration-200">$</span>
                          <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 input-focus transition-all duration-300 focus:scale-[1.01]"
                            step="0.01"
                            min="0"
                            required
                          />
                        </div>
                      </FormField>

                      <FormField label="Category" htmlFor="category" required>
                        <select
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white input-focus transition-all duration-300 appearance-none focus:scale-[1.01]"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-[55%] pointer-events-none text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </FormField>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button 
                        type="button" 
                        className="flex items-center text-orange-500 hover:text-orange-600 font-medium transition-all duration-300"
                        onClick={() => handleSectionChange('photos')}
                      >
                        Next: Add Photos
                        <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={`transition-all duration-500 ${activeSection === 'photos' ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <div className="group relative flex justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50 transition-all duration-300 hover:bg-gray-50/80 hover:border-orange-200">
                    <div className="text-center">
                      <div className="relative">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 transition-transform group-hover:scale-110 duration-300" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="h-10 w-10 bg-orange-500/10 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label htmlFor="file-upload" className="relative inline-flex overflow-hidden group/btn cursor-pointer">
                          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg transition-all duration-300 group-hover/btn:scale-[1.02]"></span>
                          <span className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium rounded-lg flex items-center gap-2">
                            Upload Images
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </span>
                          <input 
                            id="file-upload" 
                            type="file" 
                            className="sr-only" 
                            multiple 
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-500 transition-all duration-300 group-hover:text-gray-600">
                        PNG, JPG, GIF up to 10MB (max: 5 images)
                      </p>
                    </div>
                  </div>

                  <ImagePreview images={images} onRemove={removeImage} />
                  
                  <div className="flex justify-between mt-6">
                    <button 
                      type="button" 
                      className="flex items-center text-gray-500 hover:text-orange-500 font-medium transition-all duration-300"
                      onClick={() => handleSectionChange('details')}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Details
                    </button>
                    
                    <button 
                      type="button" 
                      className="flex items-center text-orange-500 hover:text-orange-600 font-medium transition-all duration-300"
                      onClick={() => handleSectionChange('contact')}
                    >
                      Next: Location & Contact
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className={`transition-all duration-500 ${activeSection === 'contact' ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <div className="space-y-6">
                    <FormField label="Location" htmlFor="location" required>
                      <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State or Zip"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus transition-all duration-300 focus:scale-[1.01]"
                        required
                      />
                    </FormField>

                    <FormField label="Contact Information" htmlFor="contactInfo" required>
                      <input
                        type="text"
                        id="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="Phone number or email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus transition-all duration-300 focus:scale-[1.01]"
                        required
                      />
                    </FormField>
                    
                    <div className="flex justify-start mt-4">
                      <button 
                        type="button" 
                        className="flex items-center text-gray-500 hover:text-orange-500 font-medium transition-all duration-300"
                        onClick={() => handleSectionChange('photos')}
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Photos
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-8 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative group overflow-hidden px-10 py-4 rounded-xl text-lg font-medium shadow-md hover:shadow-glow transition-all duration-500 min-w-[220px]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 group-hover:scale-[1.02] transition-transform duration-500"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></span>
                      <span className="relative flex items-center justify-center text-white">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12 duration-300" />
                            List Your Item
                          </>
                        )}
                      </span>
                    </button>
                    
                    <p className="mt-4 text-sm text-gray-500">
                      By submitting this listing, you agree to our 
                      <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors duration-200 ml-1">Terms of Service</a> and 
                      <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors duration-200 ml-1">Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;