import Image from "next/image";
import { Mail01Icon, PhoneIcon, MapMarkerIcon, CalendarIcon } from "@/icons";

export default function CustomerDetailsInfo() {
  return (
    <div className="bg-accent-2 rounded-2xl ">
      <h3 className="text-lg border-b border-gray-500/20 px-4 sm:px-6 py-4 font-bold text-light-primary-text mb-6">
        Basic Information
      </h3>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          {/* Avatar */}
          <div className="relative size-16 sm:size-20  lg:size-25 rounded-full overflow-hidden bg-white shrink-0 border-4 border-white flex items-center justify-center">
            {/* Using a placeholder if no image, or the image itself */}
            <Image
              src="/images/customer/user_02.png"
              alt="Customer"
              width={100}
              height={100}
              className="w-full"
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full space-y-4">
            <h2 className="text-xl font-bold text-light-primary-text">
              Createuiux
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-light-primary-text">
                <Mail01Icon className="size-4 shrink-0" />
                <span className="text-sm break-all">example@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-light-primary-text">
                <PhoneIcon className="size-4 shrink-0" />
                <span className="text-sm">09834234433</span>
              </div>
              <div className="flex items-center gap-2 text-light-primary-text">
                <MapMarkerIcon className="size-4 shrink-0" />
                <span
                  className="text-sm truncate max-w-[200px]"
                  title="3517 W. Gray St. Utica, Pennsylvania 57867"
                >
                  3517 W. Gray St. Utica, Pennsylvania 57867
                </span>
              </div>
              <div className="flex items-center gap-2 text-light-primary-text">
                <CalendarIcon className="size-4 shrink-0" />
                <span className="text-sm">12 Sept, 2027</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-white rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
          <h4 className="text-sm font-bold text-light-primary-text mb-2">
            Short Description
          </h4>
          <p className="text-sm text-light-secondary-text leading-relaxed">
            Delivery usually takes 2–5 business days, depending on your location
            and the selected shipping method. You’ll receive a tracking number
            once your order is shipped.
          </p>
        </div>
      </div>
    </div>
  );
}
