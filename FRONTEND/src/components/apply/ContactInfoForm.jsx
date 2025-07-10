import { useFormContext } from "react-hook-form";
import CountryAutocomplete from "./CountryAutocomplete";

const ContactInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block font-medium">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register("contactInfo.email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="your.email@example.com"
          />
          {errors.contactInfo?.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactInfo.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            {...register("contactInfo.phone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Minimum 10 digits" },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="+1 (555) 123-4567"
          />
          {errors.contactInfo?.phone && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactInfo.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block font-medium">
          Street Address *
        </label>
        <input
          id="address"
          {...register("contactInfo.address", { required: "Address is required" })}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          placeholder="123 Main Street, Apt 4B"
        />
        {errors.contactInfo?.address && (
          <p className="text-sm text-red-500 mt-1">
            {errors.contactInfo.address.message}
          </p>
        )}
      </div>

      {/* City, State, ZIP, Country */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="city" className="block font-medium">
            City *
          </label>
          <input
            id="city"
            {...register("contactInfo.city", { required: "City is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="New York"
          />
          {errors.contactInfo?.city && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactInfo.city.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="state" className="block font-medium">
            State *
          </label>
          <input
            id="state"
            {...register("contactInfo.state", { required: "State is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="NY"
          />
          {errors.contactInfo?.state && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactInfo.state.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="zipCode" className="block font-medium">
            ZIP Code *
          </label>
          <input
            id="zipCode"
            {...register("contactInfo.zip", { required: "ZIP Code is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="10001"
          />
          {errors.contactInfo?.zip && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactInfo.zip.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="country" className="block font-medium">
            Country *
          </label>
         <CountryAutocomplete fieldPath="contactInfo.country" />
        </div>
      </div>

      {/* LinkedIn & Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="linkedIn" className="block font-medium">
            LinkedIn Profile (Optional)
          </label>
          <input
            id="linkedIn"
            {...register("contactInfo.linkedIn")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <label htmlFor="portfolio" className="block font-medium">
            Portfolio/Website (Optional)
          </label>
          <input
            id="portfolio"
            {...register("contactInfo.portfolio")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
