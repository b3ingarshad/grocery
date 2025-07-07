import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function ProfileModal({ userName, role }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [password, setPassword] = useState('');

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const openPasswordModal = (type) => {
    setModalType(type);
    setIsPasswordModalOpen(true);
  };
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const handlePasswordChange = async () => {
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        alert('Password updated successfully!');
        closePasswordModal();
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div>
      {/* Clickable Profile Icon */}
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          fontSize: '1.5rem',
          marginRight: '7px',
          cursor: 'pointer',
        }}
        onClick={openProfile}
      >
        <FontAwesomeIcon className="fa-icon" icon={faUser} />
        <span>{userName}</span>
      </div>

      {/* Profile Modal (Popup Centered) */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="absolute bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-2">Profile ({role})</h2>
            <p className="text-gray-700 mb-4">Username: {userName}</p>

            <div className="flex flex-col gap-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => openPasswordModal('change')}
              >
                Change Password
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => openPasswordModal('forgot')}
              >
                Forgot Password
              </button>
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={closeProfile}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal (Popup Centered) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="absolute bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-2">
              {modalType === 'change' ? 'Change Password' : 'Forgot Password'}
            </h2>

            <input
              type="password"
              className="border p-2 w-full mt-2 rounded"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-col gap-3 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handlePasswordChange}
              >
                {modalType === 'change' ? 'Update Password' : 'Reset Password'}
              </button>
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={closePasswordModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
