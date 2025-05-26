"use client";

import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (message: string, options?: Parameters<typeof toast>[1]) => {
      return toast(message, options);
    },
    success: (message: string, options?: Parameters<typeof toast.success>[1]) => {
      return toast.success(message, options);
    },
    error: (message: string, options?: Parameters<typeof toast.error>[1]) => {
      return toast.error(message, options);
    },
    warning: (message: string, options?: Parameters<typeof toast.warning>[1]) => {
      return toast.warning(message, options);
    },
    info: (message: string, options?: Parameters<typeof toast.info>[1]) => {
      return toast.info(message, options);
    },
    promise: toast.promise,
    dismiss: toast.dismiss,
    loading: (message: string, options?: Parameters<typeof toast.loading>[1]) => {
      return toast.loading(message, options);
    },
  };
};