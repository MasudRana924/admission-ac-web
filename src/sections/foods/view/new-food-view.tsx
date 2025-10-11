import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { useSnackbar } from 'src/components/snackbar';
import { Breadcrumb } from 'src/components/breadcrumb';
import { LucideIcon } from 'src/components/lucide-icons';
import { FoodForm, type FoodFormData } from '../components/food-form';
import { useCreateFood } from 'src/hooks/useApi';

// ----------------------------------------------------------------------

export function NewFoodView() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const createFoodMutation = useCreateFood();

  const handleSubmit = useCallback((formData: FoodFormData) => {
    // Basic validation
    if (!formData.name || !formData.category || !formData.price || !formData.preparationTime) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    // Validate price is a valid number
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      showSnackbar('Please enter a valid price', 'error');
      return;
    }

    // Validate preparation time
    if (isNaN(Number(formData.preparationTime)) || Number(formData.preparationTime) <= 0) {
      showSnackbar('Please enter a valid preparation time', 'error');
      return;
    }

    const foodData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      preparationTime: Number(formData.preparationTime),
    };

    createFoodMutation.mutate(foodData, {
      onSuccess: () => {
        showSnackbar('Food created successfully!', 'success');
        router.push('/dashboard/foods');
      },
      onError: () => {
        showSnackbar('Failed to create food. Please try again.', 'error');
      },
    });
  }, [createFoodMutation, router, showSnackbar]);

  return (
    <DashboardContent>
      <Breadcrumb
        title="New Food"
        items={[
          { title: 'Dashboard', href: '/dashboard' },
          { title: 'Foods List', href: '/dashboard/foods' },
          { title: 'New Food' }
        ]}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3, mb: 2 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => router.push('/dashboard/foods')}
          startIcon={<LucideIcon icon="eva:arrow-back-fill" />}
          sx={{
            borderColor: 'grey.400',
            color: 'grey.700',
            '&:hover': {
              borderColor: 'grey.600',
              backgroundColor: 'grey.50',
            },
          }}
        >
          Back
        </Button>
      </Box>

      <FoodForm
        onSubmit={handleSubmit}
        isLoading={createFoodMutation.isPending}
        submitButtonText="Create Food"
      />
    </DashboardContent>
  );
}
