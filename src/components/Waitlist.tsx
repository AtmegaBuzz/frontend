import { useState, useEffect, FormEvent } from "react";
import { useToast } from "../hooks/toast"; // Assuming you have this hook

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (email: string) => Promise<void>;
}

const WaitlistPopup: React.FC<WaitlistPopupProps> = ({ 
  isOpen, 
  onClose,
  onSubmit = async () => {} // Default empty function if not provided
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        type: "danger",
        message: "Please enter a valid email address",
        duration: 3000,
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Call the onSubmit prop with the email
      await onSubmit(email);
      
      toast({
        type: "success",
        message: "You've been added to our waitlist!",
        duration: 3000,
      });
      
      // Reset form and close modal
      setEmail("");
      onClose();
    } catch (error) {
      toast({
        type: "danger",
        message: "Failed to join waitlist. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-black border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-xl transform transition-all">
        {/* Close button */}
        <button 
          className="absolute right-4 top-4 text-white/60 hover:text-white"
          onClick={onClose}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        
        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Join Our Waitlist
            </h3>
            <p className="text-white/70">
              Be the first to know when we launch new features!
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ff3979] focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg bg-[#ff3979] hover:bg-[#5100ff] transition-colors duration-200 py-3 text-white text-base font-medium border-none cursor-pointer ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </button>
          </form>
          
          <p className="mt-4 text-xs text-white/50 text-center">
            We respect your privacy and will never share your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPopup;