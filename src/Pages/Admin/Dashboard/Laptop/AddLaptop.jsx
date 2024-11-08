import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../Auth/Provider/AuthProvider";
import { FaLaptopCode } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// image hosting img bb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddLaptop = () => {

  const [preview, setPreview] = useState("https://i.ibb.co.com/hDknRbh/laptop-find.jpg");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Image change
  const handleFileChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  // Image change
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };


  // React hook From
  const { register, handleSubmit, formState: { errors }, } = useForm();


  const onSubmit = async (data) => {
    setLoading(true);  // Start loading
    try {
      // Prepare the image file for upload
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);
  
      // Upload image to imgbb
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
  
      // Check if the response contains the required fields
      if (res.data && res.data.success) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
  
        // Get current date and time in Bangladesh timezone
        const bangladeshDate = new Date().toLocaleString("en-GB", {
          timeZone: "Asia/Dhaka",
          hour12: true,
        });
  
        const productsInfo = {
          title: data.title,
          price: `${data.price} BDT`,
          status: data.status,
          brand: data.brand,
          model: data.model,
          processor: data.processor,
          ram: data.ram,
          display: data.display,
          processor_Array: [
            {
              processor_Brand: data.processor_Brand,
              processor_Model: data.processor_Model,
              processor_Core: data.processor_Core
            }
          ],
          display_Array: [
            {
              display_Size: data.display_Size,
              display_Type: data.display_Type,
              display_Features: data.display_Features
            }
          ],
          memory_Array: [
            {
              ram_Type: data.ram,
              removable: data.removable
            }
          ],
          storage_Array: [
            {
              storage_Type: data.storage_Type,
              storage_Capacity: data.storage_Capacity,
              storage_Upgrade: data.storage_Upgrade
            }
          ],
          graphics_Array: [
            {
              graphics_Model: data.graphics_Model,
              graphics_Memory: data.graphics_Memory
            }
          ],
          keyboard_Array: [
            {
              keyboard_Type: data.keyboard_Type,
              keyboard_Features: data.keyboard_Features,
              touchPad: data.touchPad
            }
          ],
          camera_Audio_Array: [
            {
              webCam: data.webCam,
              speaker: data.speaker,
              microphone: data.microphone,
              audio_Features: data.audio_Features
            }
          ],
          ports_Array: [
            {
              HDMI_Port: data.HDMI_Port,
              USB_Type_C: data.USB_Type_C,
              microphone_Port: data.microphone_Port
            }
          ],
          network_Array: [
            {
              wiFi: data.wiFi,
              bluetooth: data.bluetooth
            }
          ],
          power_Array: [
            {
              battery_Type: data.battery_Type,
              adapter_Type: data.adapter_Type
            }
          ],
          physical_Specification: [
            {
              color: data.color,
              weight: data.weight
            }
          ],
          fingerprint_Sensor: data.fingerprint_Sensor,
          operating_System: data.operating_System,
          warranty_Details: data.warranty_Details,
          description: data.description,
          image: res.data.data.display_url,
          type: "laptop",
          subCategory: "laptop",
          productSKU: `LG-${data.brand.split(" ")[0]}-${data.model.split(" ")[0]}-${randomNumber}`,
          create_Date: bangladeshDate,  // Date and time added
        };
  
        // Store laptop data in MongoDB
        const response = await axiosSecure.post("/products", productsInfo);
  
        if (response.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Laptop "${data.brand}" has been added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.log("Image upload error response:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  
  


  return (
    <section  >

      <div className="  ">

        <h1 className="text-4xl text-center font-bold">Add Laptop</h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4 pl-4 pr-4">


            {/* Title */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Title </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && <span className="text-red-500 font-semibold mt-1">Title field is required</span>}
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Price</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="20000 BDT"
                {...register("price", { required: true })}
              />
              {errors.price && <span className="text-red-500 font-semibold mt-1">Price field is required</span>}
            </div>


            {/* Status */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Status</span>
              </label>
              <select className="select border w-full" placeholder="Select..." name="country" id="country" {...register("status", { required: true })}>
                <option>In Stock</option>
                <option>Out of Stock</option>
                <option>Upcoming</option>
              </select>
              {errors.status && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
            </div>

            {/* Laptop Brand */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Laptop Brand</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Apple"
                {...register("brand", { required: true })}
              />
              {errors.brand && <span className="text-red-500 font-semibold mt-1">Laptop Brand field is required</span>}
            </div>


            {/* Laptop Model */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Laptop Model</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Mac Book Pro "
                {...register("model", { required: true })}
              />
              {errors.model && <span className="text-red-500 font-semibold mt-1">Laptop Model field is required</span>}
            </div>

            {/* Processor */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Processor</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Apple M3 Pro, 12‑core CPU"
                {...register("processor", { required: true })}
              />
              {errors.processor && <span className="text-red-500 font-semibold mt-1">Processor field is required</span>}
            </div>


            {/* Ram */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">RAM</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="16GB"
                {...register("ram", { required: true })}
              />
              {errors.ram && <span className="text-red-500 font-semibold mt-1">ThiRAM field is required</span>}
            </div>

            {/* Display */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Display</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="16.2 Liquid Retina  Liquid Retina"
                {...register("display", { required: true })}
              />
              {errors.display && <span className="text-red-500 font-semibold mt-1">display field is required</span>}
            </div>

            {/* Processor Brand */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Processor Brand</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Apple"
                {...register("processor_Brand", { required: true })}
              />
              {errors.processor_Brand && <span className="text-red-500 font-semibold mt-1">Processor Brand field is required</span>}
            </div>

            {/* Processor Model */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Processor Model</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="M3 Pro chip"
                {...register("processor_Model", { required: true })}
              />
              {errors.processor_Model && <span className="text-red-500 font-semibold mt-1">Processor Model field is required</span>}
            </div>

            {/* Processor Core */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Processor Core</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="12‑core CPU, 18‑core GPU"
                {...register("processor_Core", { required: true })}
              />
              {errors.processor_Core && <span className="text-red-500 font-semibold mt-1">Processor Core field is required</span>}
            </div>

            {/* Display Size */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Display Size</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="16.2-inch"
                {...register("display_Size", { required: true })}
              />
              {errors.display_Size && <span className="text-red-500 font-semibold mt-1">Display Size field is required</span>}
            </div>

            {/* Display Type */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Display Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Liquid Retina display"
                {...register("display_Type", { required: true })}
              />
              {errors.display_Type && <span className="text-red-500 font-semibold mt-1">Display Type field is required</span>}
            </div>

            {/* Display Resolution */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Display Resolution</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="3456 x 2234"
                {...register("display_Resolution", { required: true })}
              />
              {errors.display_Resolution && <span className="text-red-500 font-semibold mt-1">Display Resolution field is required</span>}
            </div>

            {/* Display Features */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Display Features</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="XDR (Extreme Dynamic Range)"
                {...register("display_Features", { required: true })}
              />
              {errors.display_Features && <span className="text-red-500 font-semibold mt-1">Display Features field is required</span>}
            </div>

            {/* RAM Type */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">RAM Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Unified memory"
                {...register("ram_Type", { required: true })}
              />
              {errors.ram_Type && <span className="text-red-500 font-semibold mt-1">RAM Type field is required</span>}
            </div>

            {/* Removable */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Removable</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Non-Removable"
                {...register("removable", { required: true })}
              />
              {errors.removable && <span className="text-red-500 font-semibold mt-1">Removable field is required</span>}
            </div>

            {/* Storage Type */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Storage Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="SSD"
                {...register("storage_Type", { required: true })}
              />
              {errors.storage_Type && <span className="text-red-500 font-semibold mt-1">Storage Type field is required</span>}
            </div>

            {/* Storage Capacity */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Storage Capacity</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="512GB"
                {...register("storage_Capacity", { required: true })}
              />
              {errors.storage_Capacity && <span className="text-red-500 font-semibold mt-1">Storage Capacity field is required</span>}
            </div>

            {/* Storage Upgrade */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Storage Upgrade</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Configurable to: 1TB, or 2TB"
                {...register("storage_Upgrade", { required: true })}
              />
              {errors.storage_Upgrade && <span className="text-red-500 font-semibold mt-1">Storage Upgrade field is required</span>}
            </div>

            {/* Graphics Model */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Graphics Model</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Apple 10-core GPU"
                {...register("graphics_Model", { required: true })}
              />
              {errors.graphics_Model && <span className="text-red-500 font-semibold mt-1">Graphics Model field is required</span>}
            </div>

            {/* Graphics Memory */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Graphics Memory</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Shared"
                {...register("graphics_Memory", { required: true })}
              />
              {errors.graphics_Memory && <span className="text-red-500 font-semibold mt-1">Graphics Memory field is required</span>}
            </div>

            {/* Keyboard Features */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Keyboard Features</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="78 (U.S.) or 79 (ISO) keys including..."
                {...register("keyboard_Features", { required: true })}
              />
              {errors.keyboard_Features && <span className="text-red-500 font-semibold mt-1">Keyboard Features field is required</span>}
            </div>

            {/* TouchPad */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">TouchPad</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Force Touch trackpad for precise cursor control .."
                {...register("touchPad", { required: true })}
              />
              {errors.touchPad && <span className="text-red-500 font-semibold mt-1">TouchPad field is required</span>}
            </div>

            {/* webCam */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">webCam</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="1080p FaceTime HD camera"
                {...register("webCam", { required: true })}
              />
              {errors.webCam && <span className="text-red-500 font-semibold mt-1">webCam field is required</span>}
            </div>

            {/* Speaker */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Speaker</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="six-speaker sound system"
                {...register("speaker", { required: true })}
              />
              {errors.speaker && <span className="text-red-500 font-semibold mt-1">Speaker field is required</span>}
            </div>

            {/* Microphone */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Microphone</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Three-mic array with directional beamforming"
                {...register("microphone", { required: true })}
              />
              {errors.microphone && <span className="text-red-500 font-semibold mt-1">Microphone field is required</span>}
            </div>

            {/* Audio Features */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Audio Features</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Wide stereo sound"
                {...register("audio_Features", { required: true })}
              />
              {errors.audio_Features && <span className="text-red-500 font-semibold mt-1">Audio Features field is required</span>}
            </div>

            {/* HDMI Port */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">HDMI Port</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="1x HDMI"
                {...register("HDMI_Port", { required: true })}
              />
              {errors.HDMI_Port && <span className="text-red-500 font-semibold mt-1">HDMI Port field is required</span>}
            </div>
            {/* USB Type-C / Thunderbolt Port */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">USB Type-C / Thunderbolt Port</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="2 x Thunderbolt / USB 4 ports"
                {...register("USB_Type_C", { required: true })}
              />
              {errors.USB_Type_C && <span className="text-red-500 font-semibold mt-1">USB Type-C / Thunderbolt Port field is required</span>}
            </div>

            {/* Microphone Port */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Microphone Port</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="3.5 mm headphone jack"
                {...register("microphone_Port", { required: true })}
              />
              {errors.microphone_Port && <span className="text-red-500 font-semibold mt-1">Microphone Port field is required</span>}
            </div>

            {/* WiFi */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">WiFi</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder=" Wi-Fi 6E (802.11ax)"
                {...register("wiFi", { required: true })}
              />
              {errors.wiFi && <span className="text-red-500 font-semibold mt-1">WiFi field is required</span>}
            </div>

            {/* Bluetooth */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Bluetooth</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Bluetooth 5.3 wireless technology"
                {...register("bluetooth", { required: true })}
              />
              {errors.bluetooth && <span className="text-red-500 font-semibold mt-1">Bluetooth field is required</span>}
            </div>

            {/* Fingerprint Sensor */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Fingerprint Sensor</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Touch ID"
                {...register("fingerprint_Sensor", { required: true })}
              />
              {errors.fingerprint_Sensor && <span className="text-red-500 font-semibold mt-1">Fingerprint Sensor field is required</span>}
            </div>

            {/* Operating System */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Operating System</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="macOS"
                {...register("operating_System", { required: true })}
              />
              {errors.operating_System && <span className="text-red-500 font-semibold mt-1">Operating System field is required</span>}
            </div>

            {/* Battery Type */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Battery Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Lithium‑polymer"
                {...register("battery_Type", { required: true })}
              />
              {errors.battery_Type && <span className="text-red-500 font-semibold mt-1">Battery Type field is required</span>}
            </div>

            {/* Adapter Type */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Adapter Type</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="140W USB-C Power Adapter"
                {...register("adapter_Type", { required: true })}
              />
              {errors.adapter_Type && <span className="text-red-500 font-semibold mt-1">Adapter Type field is required</span>}
            </div>


            {/* Color */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Color</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Space Black"
                {...register("color", { required: true })}
              />
              {errors.color && <span className="text-red-500 font-semibold mt-1">Color field is required</span>}
            </div>



            {/* Warranty Details */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Warranty Details</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="1 Year international warranty"
                {...register("warranty_Details", { required: true })}
              />
              {errors.warranty_Details && <span className="text-red-500 font-semibold mt-1">Warranty Details field is required</span>}
            </div>


            {/* image */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-medium"> Image</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full  cursor-pointer"
                htmlFor="file-upload"
                {...register('image', { onChange: handleInputChange })}
              />
            </div>


          </div>

          {/* Description */}
          <div className="form-control w-full pl-4 pr-4 pb-4 -mt-4">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              type="text"
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {errors.description && <span className="text-red-500 font-semibold mt-1">This field is required</span>}
          </div>





          <div className="lg:flex justify-center" >
            <button
              className="btn btn-primary text-white w-32"
              disabled={loading}

            >
              {loading ? (
                <span className="loading loading-ring loading-sm"></span>
              ) : (
                "Submit Laptop"
              )}
            </button>
          </div>

        </form>
      </div>


    </section>
  );
};

export default AddLaptop;
