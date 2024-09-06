import { gql, request } from "graphql-request";
import { BusinessType, CategoryType } from "@/types/type";

const MASTER_URL = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_MASTER_URL_KEY}/master`;

const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        backgroundColour {
          hex
        }
        id
        name
        icon {
          url
        }
      }
    }
  `;
  const response: CategoryType[] = await request(MASTER_URL, query);
  return response;
};

const getBusinessLists = async () => {
  const query = gql`
    query businessLists {
      businessLists {
        category {
          name
        }
        email
        id
        images {
          url
        }
        name
        about
        address
        contactPerson
      }
    }
  `;
  const response: BusinessType[] = await request(MASTER_URL, query);
  return response;
};

const getBusinessByCategory = async (category: string) => {
  const query = gql`
    query getBusinessByCategory($category: String!) {
      businessLists(where: { category: { name: $category } }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        name
        id
        images {
          url
        }
      }
    }
  `;
  const variables = { category };
  const response: BusinessType[] = await request(MASTER_URL, query, variables);
  return response;
};

const getBusinessDetails = async (id: string) => {
  const query = gql`
    query getBusinessDetails($id: ID!) {
      businessList(where: { id: $id }) {
        about
        address
        contactPerson
        category {
          name
        }
        email
        id
        images {
          url
        }
        name
      }
    }
  `;
  const variables = { id };
  const response: BusinessType[] = await request(MASTER_URL, query, variables);
  return response;
};

const createBooking = async (
  businessId: string,
  date: string,
  time: string,
  userEmail: string,
  userName: string
) => {
  const mutationQuery =
    gql`
  mutation CreateBooking {
    createBooking(
      data: {bookingStatus: booked, 
        businessList: {connect: {id: "` +
    businessId +
    `"}},
         date: "` +
    date +
    `", time: "` +
    time +
    `", 
         userEmail: "` +
    userEmail +
    `",
          username: "` +
    userName +
    `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const isBookedSlot = async (businessId: string, date: string) => {
  const query =
    gql`
    query isBusinessBooked {
      bookings(where: { businessList: { id: "` +
    businessId +
    `" }, date: "` +
    date +
    `" }) {
        date
        time
      }
    }
  `;
  const res = await request(MASTER_URL, query);
  return res;
};

const getBookingList = async (email: string) => {
  const query =
    gql`
    query MyQuery {
      bookings(where: { userEmail: "` +
    email +
    `" }) {
        id
        businessList {
          name
          images {
            url
          }
          contactPerson
          email
          address
        }
        time
        date
        bookingStatus

      }
    }
  `;
  const res = await request(MASTER_URL, query);
  return res;
};

const api = {
  getCategory,
  getBusinessLists,
  getBusinessByCategory,
  getBusinessDetails,
  createBooking,
  isBookedSlot,
  getBookingList,
};

export default api;
