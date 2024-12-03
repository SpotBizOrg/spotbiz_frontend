import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvatarModal from "../components/AvatarModal";

const mockAvatars = [
  { picId: 1, imageUrl: "avatar1.png" },
  { picId: 2, imageUrl: "avatar2.png" },
  { picId: 3, imageUrl: "avatar3.png" },
];

describe("AvatarModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSelectAvatar = jest.fn();
  const mockOnUpdate = jest.fn();

  it("renders correctly when open", () => {
    render(
      <AvatarModal
        isOpen={true}
        onClose={mockOnClose}
        avatars={mockAvatars}
        selectedAvatar={null}
        onSelectAvatar={mockOnSelectAvatar}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText("Choose Your Avatar")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(mockAvatars.length);
  });

  it("does not render when closed", () => {
    render(
      <AvatarModal
        isOpen={false}
        onClose={mockOnClose}
        avatars={mockAvatars}
        selectedAvatar={null}
        onSelectAvatar={mockOnSelectAvatar}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.queryByText("Choose Your Avatar")).not.toBeInTheDocument();
  });

  it("triggers onSelectAvatar when an avatar is clicked", () => {
    render(
      <AvatarModal
        isOpen={true}
        onClose={mockOnClose}
        avatars={mockAvatars}
        selectedAvatar={null}
        onSelectAvatar={mockOnSelectAvatar}
        onUpdate={mockOnUpdate}
      />
    );

    const avatarImages = screen.getAllByRole("img");
    fireEvent.click(avatarImages[0]);

    expect(mockOnSelectAvatar).toHaveBeenCalledWith(mockAvatars[0]);
  });

  it("triggers onClose when the Cancel button is clicked", () => {
    render(
      <AvatarModal
        isOpen={true}
        onClose={mockOnClose}
        avatars={mockAvatars}
        selectedAvatar={null}
        onSelectAvatar={mockOnSelectAvatar}
        onUpdate={mockOnUpdate}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("triggers onUpdate when the Update button is clicked", () => {
    render(
      <AvatarModal
        isOpen={true}
        onClose={mockOnClose}
        avatars={mockAvatars}
        selectedAvatar={mockAvatars[0]}
        onSelectAvatar={mockOnSelectAvatar}
        onUpdate={mockOnUpdate}
      />
    );

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it("applies selected style to the selected avatar", () => {
    render(
      <AvatarModal
        isOpen={true}
        onClose={mockOnClose}
        avatars={mockAvatars}
        selectedAvatar={mockAvatars[1]}
        onSelectAvatar={mockOnSelectAvatar}
        onUpdate={mockOnUpdate}
      />
    );

    const avatarImages = screen.getAllByRole("img");
    expect(avatarImages[1]).toHaveClass("border-2 border-primary");
  });
});
