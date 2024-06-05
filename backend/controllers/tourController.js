import Tour from "../models/Tour.js";

//create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created!",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create!",
    });
  }
};

//update new tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Updated!",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
    });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
    });
  }
};

//getSingle tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Page not found!",
    });
  }
};

//getAll tour
export const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 12)
      .limit(12);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully!",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Page not found!",
    });
  }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
  const cityQuery = req.query.city; // Get the city query from the request
  let cityRegex;
  if (cityQuery) {
    const cityLower = cityQuery.toLowerCase(); // Convert city name to lowercase
    cityRegex = new RegExp(cityLower, "i"); // Create case-insensitive regular expression
  } else {
    // If city query is not provided, match any city
    cityRegex = /.*/;
  }

  const maxGroupSize = parseInt(req.query.maxGroupSize);
  
  try {
    const tours = await Tour.find({
      title : cityRegex, // Use the case-insensitive regular expression for city search
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
  }
};

//get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(12);
    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Page not found!",
    });
  }
};

//get tour counts

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch!",
    });
  }
};
