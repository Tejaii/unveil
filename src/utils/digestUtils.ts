import { userProfile } from '@/lib/supabase';

/**
 * Utility function to get all users who opted in for digests
 * This should be used server-side for sending digest emails
 */
export const getDigestSubscribers = async () => {
  try {
    const { data, error } = await userProfile.getDigestOptInUsers();
    
    if (error) {
      console.error('Error fetching digest subscribers:', error);
      return { subscribers: [], error };
    }

    return { 
      subscribers: data || [], 
      error: null,
      campusUsers: data?.filter(user => user.is_campus_user) || [],
      regularUsers: data?.filter(user => !user.is_campus_user) || []
    };
  } catch (error) {
    console.error('Error in getDigestSubscribers:', error);
    return { subscribers: [], error };
  }
};

/**
 * Example usage for server-side digest sending
 */
export const sendDigestEmails = async () => {
  const { subscribers, campusUsers, regularUsers, error } = await getDigestSubscribers();
  
  if (error) {
    console.error('Failed to get subscribers:', error);
    return;
  }

  console.log(`Total subscribers: ${subscribers.length}`);
  console.log(`Campus users: ${campusUsers.length}`);
  console.log(`Regular users: ${regularUsers.length}`);

  // Here you would integrate with your email service
  // Example: Send different digest content to campus vs regular users
  
  for (const user of subscribers) {
    try {
      // Send email logic here
      console.log(`Sending digest to ${user.email} (Campus: ${user.is_campus_user})`);
      
      // Example email service integration:
      // await emailService.send({
      //   to: user.email,
      //   subject: user.is_campus_user ? 'IITH Campus Digest' : 'Unveil Daily Digest',
      //   template: user.is_campus_user ? 'campus-digest' : 'regular-digest',
      //   data: { /* digest content */ }
      // });
      
    } catch (emailError) {
      console.error(`Failed to send digest to ${user.email}:`, emailError);
    }
  }
};