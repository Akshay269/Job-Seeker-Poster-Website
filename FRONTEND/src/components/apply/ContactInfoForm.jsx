import { useFormContext } from "react-hook-form";
import CountryAutocomplete from "./CountryAutocomplete";

const ContactInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block font-medium">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Minimum 10 digits" },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block font-medium">
          Street Address
        </label>
        <input
          id="address"
          {...register("address",{required:"Address is required"})}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          placeholder="123 Main Street, Apt 4B"
        />
        {errors.address && (
          <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="city" className="block font-medium">
            City
          </label>
          <input
            id="city"
            {...register("city",{required:"City is required"})}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="New York"
          />
          {errors.city && (
          <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
        )}
        </div>
        <div>
          <label htmlFor="state" className="block font-medium">
            State
          </label>
          <input
            id="state"
            {...register("state",{required:"State is required"})}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="NY"
          />
          {errors.state && (
          <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
        )}
        </div>
        <div>
          <label htmlFor="zipCode" className="block font-medium">
            ZIP Code
          </label>
          <input
            id="zipCode"
            {...register("zipCode",{required:"ZipCode is required"})}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="10001"
          />
          {errors.zipCode && (
          <p className="text-sm text-red-500 mt-1">{errors.zipCode.message}</p>
        )}
        </div>
        <div>
          <label htmlFor="country" className="block font-medium">
            Country
          </label>
          <CountryAutocomplete />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="linkedIn" className="block font-medium">
            LinkedIn Profile
          </label>
          <input
            id="linkedIn"
            {...register("linkedIn")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {errors.linkedIn && (
            <p className="text-sm text-red-500 mt-1">
              {errors.linkedIn.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="portfolio" className="block font-medium">
            Portfolio/Website
          </label>
          <input
            id="portfolio"
            {...register("portfolio")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://yourportfolio.com"
          />
          {errors.portfolio && (
            <p className="text-sm text-red-500 mt-1">
              {errors.portfolio.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
