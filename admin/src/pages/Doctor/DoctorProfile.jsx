import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { backendUrl, dtoken, profileData, getProfileData, setProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false); 

  const updateProfile = async () => {
    try {
      setLoading(true); 
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="m-5">
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              className="bg-gray-200 w-full sm:w-64 rounded-lg object-cover"
              src={profileData.image}
              alt={profileData.name}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 border border-stone-300 rounded-lg p-6 bg-white">
            <p className="text-2xl font-semibold text-gray-800">
              {profileData.name}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="py-0.5 px-2 border text-xs rounded-full bg-gray-50">
                {profileData.experience}
              </span>
            </div>

            {/* About */}
            <div className="mt-4">
              <p className="text-sm font-medium text-neutral-800">About:</p>
              <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
            </div>

            {/* Fees */}
            <div className="mt-4">
              <p className="text-gray-600 font-medium">
                Appointment Fee:
                {isEdit ? (
                  <input
                    className="ml-2 border rounded p-1 w-24"
                    value={profileData.fees}
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span className="ml-1 text-gray-800">
                    {currency} {profileData.fees}
                  </span>
                )}
              </p>
            </div>

            {/* Address */}
            <div className="mt-3">
              <p className="text-sm font-medium text-neutral-800">Address:</p>
              <div className="text-sm text-gray-600">
                {isEdit ? (
                  <>
                    <input
                      className="p-2 border rounded mb-2 w-full"
                      type="text"
                      value={profileData.address?.line1 || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                    />
                    <input
                      className="p-2 border rounded w-full"
                      type="text"
                      value={profileData.address?.line2 || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                    />
                  </>
                ) : (
                  <p>
                    {profileData.address?.line1}, {profileData.address?.line2}
                  </p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-4">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                id="available"
              />
              <label htmlFor="available" className="text-sm text-gray-700">
                Available
              </label>
            </div>

            {/* Edit / Save Button */}
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="mt-5 px-4 py-2 rounded-lg bg-black text-white text-sm cursor-pointer hover:opacity-80"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={updateProfile}
                disabled={loading}
                className={`mt-5 px-4 py-2 rounded-lg text-white text-sm cursor-pointer ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black hover:opacity-80"
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
