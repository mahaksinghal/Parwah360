import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaImage, FaSearch, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./UpdateSpecialization.css";

function UpdateSpecialization() {
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        specializationImage: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Component mounted, checking auth...");
        console.log("JWT Token:", sessionStorage.getItem("jwtToken"));
        console.log("User Role:", sessionStorage.getItem("userRole"));
        fetchSpecializations();
    }, []);

    const fetchSpecializations = async () => {
        try {
            console.log("Fetching specializations...");

            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.get(
                "http://localhost:8080/admin/getAllSpecialization",
                config
            );

            console.log("Specializations response:", response.data);
            setSpecializations(response.data);

        } catch (error) {
            console.error("Error fetching specializations:", error);
            console.error("Error response:", error.response);
            console.error("Error status:", error.response?.status);
            console.error("Error data:", error.response?.data);
            toast.error(`Failed to load specializations: ${error.response?.data || error.message}`);
        }
    };

    const handleSpecializationSelect = (specialization) => {
        setSelectedSpecialization(specialization);
        setFormData({
            name: specialization.name,
            specializationImage: null
        });
        setImagePreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                specializationImage: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSpecialization) {
            toast.error("Please select a specialization to update");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Specialization name is required");
            return;
        }

        if (!formData.specializationImage) {
            toast.error("Please select an image to update");
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("specializationImage", formData.specializationImage);

            const response = await axios.put(
                `http://localhost:8080/admin/updateSpecialization/${selectedSpecialization.id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Specialization updated successfully!");

            // Reset form
            setSelectedSpecialization(null);
            setFormData({
                name: "",
                specializationImage: null
            });
            setImagePreview(null);

            // Refresh specializations list
            fetchSpecializations();

        } catch (error) {
            console.error("Error updating specialization:", error);
            toast.error(error.response?.data || "Failed to update specialization");
        } finally {
            setLoading(false);
        }
    };

    const filteredSpecializations = specializations.filter(spec =>
        spec.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="update-specialization-container">
            <ToastContainer />

            <div className="update-specialization-header">
                <div className="header-content">
                    <div className="header-text">
                        <h2>
                            <FaEdit className="me-2" />
                            Update Specialization
                        </h2>
                        <p className="text-muted">Select a specialization to update its details</p>
                    </div>
                    <button
                        className="btn btn-outline-light btn-home"
                        onClick={() => navigate("/admin")}
                    >
                        <FaHome className="me-1" />
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="row">
                {/* Specializations List */}
                <div className="col-md-6">
                    <div className="specializations-list-card">
                        <div className="card-header">
                            <h5>Select Specialization</h5>
                            <div className="search-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search specializations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="specializations-list">
                            {filteredSpecializations.length === 0 ? (
                                <div className="text-center text-muted p-4">
                                    No specializations found
                                </div>
                            ) : (
                                filteredSpecializations.map((spec) => (
                                    <div
                                        key={spec.id}
                                        className={`specialization-item ${selectedSpecialization?.id === spec.id ? "selected" : ""
                                            }`}
                                        onClick={() => handleSpecializationSelect(spec)}
                                    >
                                        <div className="spec-info">
                                            <h6>{spec.name}</h6>
                                            <small className="text-muted">ID: {spec.id}</small>
                                        </div>
                                        {spec.specializationImage && (
                                            <div className="spec-image">
                                                <img
                                                    src={`data:image/jpeg;base64,${spec.specializationImage}`}
                                                    alt={spec.name}
                                                    className="current-image"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Update Form */}
                <div className="col-md-6">
                    <div className="update-form-card">
                        <div className="card-header">
                            <h5>Update Details</h5>
                        </div>

                        {selectedSpecialization ? (
                            <form onSubmit={handleSubmit} className="update-form">
                                <div className="form-group">
                                    <label htmlFor="name">Specialization Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter specialization name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specializationImage">
                                        <FaImage className="me-1" />
                                        New Specialization Image
                                    </label>
                                    <input
                                        type="file"
                                        id="specializationImage"
                                        name="specializationImage"
                                        className="form-control"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                </div>

                                {imagePreview && (
                                    <div className="image-preview">
                                        <label>New Image Preview:</label>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="preview-image"
                                        />
                                    </div>
                                )}

                                {selectedSpecialization.specializationImage && (
                                    <div className="current-image-section">
                                        <label>Current Image:</label>
                                        <img
                                            src={`data:image/jpeg;base64,${selectedSpecialization.specializationImage}`}
                                            alt="Current"
                                            className="current-image-large"
                                        />
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm me-2" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaEdit className="me-1" />
                                                Update Specialization
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setSelectedSpecialization(null);
                                            setFormData({ name: "", specializationImage: null });
                                            setImagePreview(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="no-selection">
                                <div className="text-center text-muted p-5">
                                    <FaEdit size={48} className="mb-3 opacity-50" />
                                    <h6>Select a specialization from the list to update</h6>
                                    <p>Choose any specialization to modify its name and image</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateSpecialization;
