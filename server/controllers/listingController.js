import { storage } from '../storage.js';

export const getAllListings = async (req, res) => {
  try {
    const listings = await storage.getAllListings();
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error getting listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const listing = await storage.getListing(listingId);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.status(200).json(listing);
  } catch (error) {
    console.error('Error getting listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getListingsByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const listings = await storage.getListingsByUser(userId);
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error getting user listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createListing = async (req, res) => {
  try {
    const { provider_id, title, description, location, price, bedrooms, 
            bathrooms, property_type, amenities, available_from, lease_term, photo_url } = req.body;
    
    const newListing = await storage.createListing({
      provider_id,
      title,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      property_type,
      amenities,
      available_from,
      lease_term,
      photo_url
    });
    
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const updates = req.body;
    
    const updatedListing = await storage.updateListing(listingId, updates);
    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    
    const success = await storage.deleteListing(listingId);
    if (!success) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
