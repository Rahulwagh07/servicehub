import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../components/common/IconBtn"
import { VscAdd } from "react-icons/vsc"
import { getAllServicesOfOwner } from "../services/operations/serviceCenterAPI"
import ServiceCard from "../components/servicecenter/ServiceCard"

function ListedServices() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async () => {
            const result = await getAllServicesOfOwner(token)
            if(result) {
                setServices(result)
            }
        }
        fetchServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-10/12 mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl sm:text-lg font-medium text-black">Listed Services</h1>
                <IconBtn
                    text="List new service"
                    onclick={() => navigate("/list-service")}
                    >
                    <VscAdd />
                </IconBtn>
            </div>
            {services && <div>
                {services?.length === 0 ? (
                    <div className="shadow-lg p-10 mt-10  border-sky-500 border-t flex items-center justify-center">
                        <h3 className="text-pure-greys-600 font-semibold">No listed services found</h3>
                    </div>
                ) : (
                    services.map((service) => (
                        <div key={service._id} 
                            className="flex flex-col gap-2">
                        <ServiceCard key={service._id} service={service} setServices={setServices}/>
                        </div>
                    ))
                )}
            </div>
            }
        </div>
    )
}

export default ListedServices