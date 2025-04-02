import { useEffect, useState } from 'react';
import { MarkerDetails } from '../markers/types';
import { getFullImageUrl } from '../../utils/imageUtils';

interface UseMarkerImagesReturn {
  mainImage: string | null;
  additionalImages: string[];
  allImages: string[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to manage marker images
 * This hook processes marker images from the MarkerDetails object
 */
export const useMarkerImages = (spot: MarkerDetails | null): UseMarkerImagesReturn => {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!spot) {
      setIsLoading(false);
      setMainImage(null);
      setAdditionalImages([]);
      setAllImages([]);
      return;
    }

    try {
      console.log("useMarkerImages processing spot:", spot);
      
      // Set main image if available - convert to full URL

      if (spot.imageUrl) {
        const mainImageUrl = getFullImageUrl(spot.imageUrl);
        setMainImage(mainImageUrl);
      } else {
        setMainImage(null);
      }

      // Set additional images if available - convert all to full URLs
      let additionalImagesUrls: string[] = [];
      if (Array.isArray(spot.additionalImages) && spot.additionalImages.length > 0) {
        additionalImagesUrls = spot.additionalImages
          .map(url => getFullImageUrl(url))
          .filter((url): url is string => url !== null && url !== '');
        setAdditionalImages(additionalImagesUrls);
      } else {
        setAdditionalImages([]);
      }

      // Combine all images for the carousel
      const combined: string[] = [];
      
      // Add main image if it exists
      if (spot.imageUrl) {
        const mainImageUrl = getFullImageUrl(spot.imageUrl);
        if (mainImageUrl) {
          combined.push(mainImageUrl);
        }
      }

      
      // Add additional images
      combined.push(...additionalImagesUrls);
      
      console.log("Combined images:", combined);
      setAllImages(combined);
      setIsLoading(false);
    } catch (err) {
      console.error("Error in useMarkerImages:", err, "Spot:", spot);
      setError(err instanceof Error ? err : new Error('Error processing images'));
      setMainImage(null);
      setAdditionalImages([]);
      setAllImages([]);
      setIsLoading(false);
    }
  }, [spot]);

  return {
    mainImage,
    additionalImages,
    allImages,
    isLoading,
    error
  };
};