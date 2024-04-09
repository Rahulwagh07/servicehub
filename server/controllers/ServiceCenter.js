const ServiceCenter = require('../models/ServiceCenter')
const Category = require('../models/Category')
const {uploadImageToCloudinary} = require("../utils/imageUploader")


exports.createServiceCenter = async (req, res) => {
    try {
        const { name, phone, email, services, openingHours, category, status} = req.body;
        const ownerId = req.user.id;

        if (!name || !phone  || !category) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
        const foundCategory = await Category.findById(category);

         // Upload the image to cloudinary
         const serviceCoverImage = req.files.image
         const serviceImageFromCloudinary = await uploadImageToCloudinary(
            serviceCoverImage,
            process.env.FOLDER_NAME
            )

        // Create the service center with the found or newly created category ID
        const newServiceCenter = await ServiceCenter.create({
            name,
            ownerId,
            phone,
            email,
            services,
            openingHours,
            category: foundCategory._id,  
            status: status,
            image: serviceImageFromCloudinary.secure_url,
        });

        // Add the newly created service in category
        foundCategory.serviceCenters.push(newServiceCenter._id);
        await foundCategory.save();
        return res.status(200).json({
			success: true,
			message: "Service Center Created",
		});
    } catch (error) {
		return res.status(500).json({
			success: false,  
			message: error.message,
		});
	}
};

exports.deleteServiceCenter = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedServiceCenter = await ServiceCenter.findByIdAndDelete(id);
        if (!deletedServiceCenter) {
            return res.status(404).json({ message: 'Service center not found' });
        }
        res.json({ message: 'Service center deleted successfully' });
    } catch (error) {
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
};

exports.getServiceCenterDetails = async (req, res) => {
    try {
        const { id } = req.body;

        const serviceCenter = await ServiceCenter.findById(id);
        if (!serviceCenter) {
            return res.status(404).json({
                success: false,
                message: 'Service center not found' 
            });
        }
        return res.status(200).json({
			success: true,
			data: serviceCenter,
		});
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
};

exports.getAllServicesOfOwner = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const allServices = await ServiceCenter.find({ ownerId });

        if (!allServices || allServices.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No services found' 
            });
        }

        return res.status(200).json({
            success: true,
            data: allServices,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.editService = async (req, res) => {
    try {
        const { serviceId, name, phone, email, services, openingHours, status, image } = req.body;
        if (!serviceId || !name || !phone) {
            return res.status(400).json({ success: false, error: 'Required fields missing' });
        }
        const existingService = await ServiceCenter.findById(serviceId);

        if (!existingService) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }

        existingService.name = name;
        existingService.phone = phone;
        existingService.email = email;
        existingService.services = services;
        existingService.openingHours = openingHours;
        existingService.status = status;
        existingService.image = image;

        //To do - category update
        await existingService.save();
        return res.status(200).json({ 
            success: true, 
            data: existingService
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Error in updating service' 
        });
    }
};

exports.getServiceDetails = async (req, res) => {
    try {
        const userId = req.user.id
        const { serviceId } = req.body;
        const serviceDetail = await ServiceCenter.findById(serviceId)

        if (!serviceDetail) {
            return res.status(400).json({
                success: false,
                message: "Service not found.",
            })
        }

        return res.status(200).json({
            success: true,
            data:{
                serviceDetail,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: error.message 
        });
    }
}

exports.getAllServices = async (req, res) => {
    try {
        const { searchQuery } = req.body;

        let query = {
            status: 'published',
        };

        if (searchQuery) {
            // Apply the search query to filter services
            query = {
                ...query,
                $or: [
                    { category: { $regex: searchQuery, $options: 'i' } },
                    { name: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }

        const servicesDetails = await ServiceCenter.find(query);

        res.status(201).json({ 
            success: true, 
            data: servicesDetails 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: "Server error"
        });
    }
}
